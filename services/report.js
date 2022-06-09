const {Report} = require('../models/report');
const Check = require('../models/check');
const jwtDecode = require('jwt-decode');

const getReport = async (req, res) => {
    try{
        //decode jwt token to get userId
        //search check collection by given checkId in req.body else return
        //check if checkId in userId else return
        //query report by checkId else return
        //return report
    }
    catch(error){
        //log error
    }
};

const getReportsByTag = async (req, res) => {
    try{
        //same logic as above
        //save all checks found in db in array using their tag value provided in req.body
        //search in report collection by providing checks array else return
        //return reportsByTag
    }
    catch(error){
        //log error
    }
};

module.exports = {getReport, getReportsByTag};