const {Report} = require('../models/report');
const Check = require('../models/check');
const jwtDecode = require('jwt-decode');

const getReport = async (req, res) => {
    try{
        const token = req.cookies['jwtToken'];
        const userPayload = jwtDecode(token);
        
        const check = await Check.findById(userPayload._id);
        if(!check) return error = { message: 'Report not found!'};

        let report = await Report.findOne({checkId: userPayload._id});
        if(!report) return error = { message: 'Report not found!'};

        return report;
    }
    catch(error){
       console.log('getReport Service: ' + error);
    }
};

//reports does not have tag attribute unless needed to implement getting checks by tags then responding with found reports.
const getReportsByTag = async (req, res) => {
    try{
        //same logic as above
        //get all checks found in db in array using their tag value provided in req.body
        //search in report collection by providing checks array else return
        //return reportsByTag
    }
    catch(error){
        console.log('getReportsByTag Service: ' + error);
    }
};

module.exports = {getReport, getReportsByTag};