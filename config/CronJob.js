const nodecron = require('node-cron');
const Report = require('../models/report');
const ReportSerivce = require('../services/report');

//scheduling updating reports status every second 
const updateReport = nodecron.schedule('* * * * * *', async function() {
    
    try {
        await ReportSerivce.scheduledUpdateForReports();
        // console.log('Updating reports each 1 seconds');
    }
    catch(error){
        console.log(error)
    }
    
});

const startJob = updateReport.start();

module.exports = {startJob};