const express = require('express');
const router = express.Router();
const CheckController = require('../controllers/check');
const RequestValidator = require('../middleware/requestValidator');
const checkValidator = require('../middleware/checkValidator');
const jwtAuth = require('../middleware/auth');

//route for creating new URL for user
router.post('/new', jwtAuth.authUsingCookie, RequestValidator.validate(checkValidator.checkValidation), CheckController.createCheck);

//route for getting all Urls
router.get('/:id', jwtAuth.authUsingCookie, CheckController.getCheck);

//route for modifying user details
router.put('/:id', jwtAuth.authUsingCookie, CheckController.updateCheck);

//route for delete using given ID
router.delete('/:id', jwtAuth.authUsingCookie, CheckController.deleteCheck);

module.exports = router;