const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const RequestValidator = require('../middleware/requestValidator');
const UserValidator = require('../middleware/userValidator');
const jwtAuth = require('../middleware/auth');

//route for registering new user
router.post('/register', RequestValidator.validate(UserValidator.userValidation), UserController.createUser);

//route for email verification
router.get('/verify-email', UserController.verifyEmail);

//route for login current user
router.post('/login', UserController.loginUser);

//route for logout current user
router.get('/logout', UserController.userLogout);

//route for getting all users
router.get('/', UserController.getAllUsers);

//route for getting specific user by ID which is for authorized users only
router.get('/:id', jwtAuth.authUsingCookie, UserController.getUserById);

//route for modifying user details
router.put('/:id', UserController.updateUserById);

//route for delete using given ID
router.delete('/:id', UserController.deleteUserById);

module.exports = router;