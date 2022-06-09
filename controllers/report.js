const ReportService = require('../services/report');
const _ = require('lodash');

const getReport = async (req, res) => {
    try{
        const user = ReportService.getReport(req);
        res.status(200).send(user);
    }
    catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    };
};


const getReportsByTag = async (req, res) => {
    try{
        const user = await ReportService.getReportsByTag(req);
        res.status(200).send(user);
    }
    catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    };
};

module.exports = {getReport, getReportsByTag};