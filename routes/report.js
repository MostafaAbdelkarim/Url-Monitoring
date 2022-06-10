const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/report');
const jwtAuth = require('../middleware/auth');

//route for getting reports for authenticated users
router.get('/myreports', jwtAuth.authUsingCookie, ReportController.getReport);

//route for getting reports by tag
router.get('/tags', jwtAuth.authUsingCookie, ReportController.getReportsByTag);

module.exports = router;