const express = require('express');
const router = express.Router();
const CheckController = require('../controllers/check');
const RequestValidator = require('../middleware/requestValidator');
const checkValidator = require('../middleware/checkValidator');
const jwtAuth = require('../middleware/auth');

//route for creating new check for user
router.post('check/new', jwtAuth.authUsingCookie, RequestValidator.validate(checkValidator.checkValidation), CheckController.createCheck);

//route for getting all checks
router.get('check/mychecks', jwtAuth.authUsingCookie, CheckController.getCheck);

//route for modifying user details
router.put('check/update', jwtAuth.authUsingCookie, CheckController.updateCheck);

//route for delete using given ID
router.delete('check/delete', jwtAuth.authUsingCookie, CheckController.deleteCheck);

//route for delete using given ID
router.get('check/:tags', jwtAuth.authUsingCookie, CheckController.getChecksByTag);

module.exports = router;