const {Report} = require('../models/report');
const Check = require('../models/check');
const jwtDecode = require('jwt-decode');
const _ = require('lodash');
const axios = require('axios');

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

const scheduledUpdateForReports = async (req, res) => {
    try{
        //get all urls from all checks
        //for each url, calculate the status for the report aka (outages, downtime .. etc) using axios
        //save each report to db after edit.
        //this function is bound to get called and updated every x time using node-cron jobs.
    }
    catch(error){
        console.log('scheduledUpdateForReports error: ' + error)
    }
};

module.exports = {getReport, getReportsByTag, scheduledUpdateForReports};