const nodecron = require('node-cron');
const Report = require('../models/report');
const ReportSerivce = require('../services/report');

//scheduling updating reports status every 5 seconds 
const updateReport = nodecron.schedule('* * * * * *', async function() {
    
    try {
        await ReportSerivce.scheduledUpdateForReports();
        // console.log('Updating reports each 5 seconds');
    }
    catch(error){
        console.log(error)
    }
    
});

const startJob = updateReport.start();

module.exports = {startJob};