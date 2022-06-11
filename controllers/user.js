const UserService = require('../services/user');
const _ = require('lodash');


const createUser = async (req, res) => {
    try{
        const result = {user, error} = await UserService.createUser(req.body);
        if(result.message) return res.status(400).send(result.message);
        return res.status(201).send(_.pick(result.user, ['_id', 'name', 'email']));
    }
    catch (error){
        console.log(error);
        res.status(500).send(`Internal Server Error`);
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
        const {user, error} = result = await UserService.getUserById(req.params.id);
        if(result.message) return res.status(400).send(result.message);
        res.status(200).send(user);
    }
    catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    };
};

const updateUserById = async (req, res) => {
    try{
        const {user, error} = result = await UserService.updateUserById(req);
        if(result.message) return res.status(400).send(result.message);
        res.status(200).send(user);
    }
    catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    };
};

const deleteUserById = async (req, res) => {
    try{
        const {user, error} =  result = await UserService.deleteUserById(req);
        if(result.message) return res.status(400).send(result.message);
        res.status(200).send(user);
    }
    catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    };
};

const loginUser = async (req, res) => {
    try{
        const result = {user, token, error} = await UserService.loginUser(req.body);
        if(result.message) return res.status(400).send(result.message);
        return res.status(200).cookie('jwtToken', result.token).send(`Welcome ${user.name}`);
    }
    catch (error){
        console.error(error);
        res.status(500).send(`Internal Server Error`);
    };
};

const userLogout = async (req, res) => {
    try{
        res.cookie('jwtToken', "", {maxAge: 1});
        res.clearCookie('jwtToken');
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
        console.log('CONTROLLER VERIFY: ' + error);
    }
};


module.exports = {createUser, getAllUsers, getUserById, updateUserById, deleteUserById, loginUser, userLogout, verifyEmail};