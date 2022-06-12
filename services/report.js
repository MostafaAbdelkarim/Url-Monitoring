const {Report} = require('../models/report');
const Check = require('../models/check');
const jwtDecode = require('jwt-decode');
const _ = require('lodash');
const axiosCheck = require('../middleware/axiosCheck');

const getReport = async (req, res) => {
    try{
        const token = req.cookies['jwtToken'];
        const userPayload = jwtDecode(token);

        const check = await Check.findOne({userId: userPayload._id});
        if(!check) return error = { message: 'Report NOT found!!'};

        let report = await Report.find({checkId: check._id}).select('-_id -checkId -__v');
        if(!report) return error = { message: 'Report not found!'};

        return {report};
    }
    catch(error){
       console.log('getReport Service: ' + error);
    }
};

const getReportsByTag = async (req, res) => {
    try{
        const token = req.cookies['jwtToken'];
        const userPayload = jwtDecode(token);

        const check = await Check.find({userId: userPayload._id, tags: req.body.tags});
        if(!check) return error = { message: 'No such tags available'};

        let report = await Report.find({checkId: check._id}).select('-_id -checkId -__v');
        if(!report) return error = { message: 'Report not found!'};

        return {report};
    }
    catch(error){
        console.log('getReportsByTag Service: ' + error);
    }
};

//this implementation is not correct as i did not reach as to how get this detailed report accurately
const scheduledUpdateForReports = async (req, res) => {
    try{
        //Logic needed to be implemented should be as follows:
        //selecting all checks and only getting their checkId and url
        //using axios to send a get request for each url and get reponse
        //getting each report that is based in checkId and updating the report based on axios reponse
        //after updating each report with approperiate data we save them to db
        //this method will be called every x time interval(1 hour, every 12hrs .. etc) using node-cron
        const checks = await Check.find().select('checkId url'); 
        if(!checks) return error = {message: 'Could not find any checks'};
        
        for(let i = 0; i < checks.length; i++){
            const result = await axiosCheck.getStatusCode(checks[i].url);
            let report = await Report.findOne({checkId: checks[i]._id});
            if(!report) return error = {message: 'could not find report related to this check'};
            if(result.status === 200){
                report = await report.findOneAndUpdate({checkId: checks[i]._id},{
                    status: 200,
                    availability: (report.uptime / (report.uptime + report.downtime)) * 100,
                    outages: report.outages,
                    downtime: report.outages,
                    uptime: report.uptime + 1, 
                    responseTime: 1,
                    history: Date.now() + ' OK'
                });
            }
            else{
                report = await report.findOneAndUpdate({checkId: checks[i]._id}, {
                    status: result.status,
                    availability: (report.uptime / (report.uptime + report.downtime)) * 100,
                    outages: report.outages + 1,
                    downtime: report.downtime + 1,
                    uptime: report.uptime - 1, 
                    responseTime: 0,
                    history: Date.now() + ' Not OK'
                });
            }
        }
    }
    catch(error){
        console.log('scheduledUpdateForReports error: ' + error)
    }
};

module.exports = {getReport, getReportsByTag, scheduledUpdateForReports};