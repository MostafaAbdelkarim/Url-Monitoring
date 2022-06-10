const express = require('express');
const router = express.Router();
const CheckController = require('../controllers/check');
const RequestValidator = require('../middleware/requestValidator');
const checkValidator = require('../middleware/checkValidator');
const jwtAuth = require('../middleware/auth');

//route for creating new check for user
router.post('/new', jwtAuth.authUsingCookie, RequestValidator.validate(checkValidator.checkValidation), CheckController.createCheck);

//route for getting all checks
router.get('/mychecks', jwtAuth.authUsingCookie, CheckController.getAllChecks);

//route for modifying user details
router.put('/update', jwtAuth.authUsingCookie, CheckController.updateCheck);

//route for delete using given ID
router.delete('/delete', jwtAuth.authUsingCookie, CheckController.deleteCheck);

//route for delete using given ID
router.get('/:tags', jwtAuth.authUsingCookie, CheckController.getChecksByTag);

module.exports = router;