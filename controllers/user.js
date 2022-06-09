const UserService = require('../services/user');
const _ = require('lodash');


const createUser = async (req, res) => {
    try{
        const result = {user, token} = await UserService.createUser(req.body);
        return res.status(201).header('x-auth-token', result.token).send(_.pick(result.user, ['_id', 'name', 'email']));
    }
    catch (error){
        console.log(error);
        res.status(400).send(`User with email ${req.body.email} already exists`);
    };
};

const getAllUsers = async (req, res) => {
    try{
        const user = UserService.getAllUsers();
        res.status(200).send(user);
    }
    catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    };
};

const getUserById = async (req, res) => {
    try{
        const user = await UserService.getUserById(req.params.id);
        res.status(200).send(user);
    }
    catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    };
};

const updateUserById = async (req, res) => {
    try{
        const user = await UserService.updateUserById(req);
        res.status(200).send(user);
    }
    catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    };
};

const deleteUserById = async (req, res) => {
    try{
        const user = await UserService.deleteUserById(req);
        res.status(200).send(user);
    }
    catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    };
};

const loginUser = async (req, res) => {
    try{
        const result = {user, token} = await UserService.loginUser(req.body);
        return res.status(200).cookie('jwtToken', result.token).send(`Welcome ${user.name}`);
    }
    catch (error){
        console.error(error);
        res.status(400).send(`Incorrect Password!!`);
    };
};

const userLogout = async (req, res) => {
    try{
        res.cookie('jwtToken', "", {maxAge: 1});
        res.status(200).send('Logout Success');
    }
    catch (error){
        console.error(error);
        res.status(500).send(`Internal Server Error`);
    };
};

const verifyEmail = async (req, res) => {
    try{
        const result = await UserService.verifyEmail(req);
        return res.status(200).send('Emailed Verified');
    }
    catch (error){
        console.log('CONTROLLER VERIFY: ' + error)
    }
};


module.exports = {createUser, getAllUsers, getUserById, updateUserById, deleteUserById, loginUser, userLogout, verifyEmail};