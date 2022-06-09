const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/report');
const jwtAuth = require('../middleware/auth');

//route for creating new URL for user
router.post('/:id', jwtAuth.authUsingCookie, ReportController.getReport);

//route for getting all Urls
router.get('/', jwtAuth.authUsingCookie, ReportController.getReportsByTag);

module.exports = router;