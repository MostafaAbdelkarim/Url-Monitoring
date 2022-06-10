const ReportService = require('../services/report');
const _ = require('lodash');

const getReport = async (req, res) => {
    try{
        const { report, error} = await ReportService.getReport(req);
        if(error) return res.status(400).send(error.message);
        res.status(200).send(report);
    }
    catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    };
};


const getReportsByTag = async (req, res) => {
    try{
        const { report, error} = await ReportService.getReport(req);
        if(error) return res.status(400).send(error.message);
        res.status(200).send(report);
    }
    catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    };
};

module.exports = {getReport, getReportsByTag};