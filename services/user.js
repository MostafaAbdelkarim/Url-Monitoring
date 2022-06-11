const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const crypto = require('crypto');
const emailVerifier = require('../middleware/emailVerifier');

const createUser = async (req, res) => {

    let user = await User.findOne({email: req.email});
    if(user) return error = { message: 'User already exists'};
    
    const salt = await bcrypt.genSalt(10);
    encryptedPassword = await bcrypt.hash(req.password, salt);
    user = new User ({
        name: req.name,
        email: req.email,
        password: encryptedPassword,
        isVerified: false,
        emailToken: crypto.randomBytes(64).toString('hex')
    });
    await user.save();

    console.log('EmailToken: ' + user.emailToken);

    const mailOptions = emailVerifier.mailOptions(user.email, user.name, user.emailToken);
    emailSent = emailVerifier.sendCustomMail(mailOptions);

    return {user};
};

const getAllUsers = async () => {
    try{
        const user = await User.find().sort('name');
        return user;
    }
    catch(error){
        console.log(error);
    }
};

const getUserById = async (req, res) =>{
    try{
        const user = await User.findById(req);
        if(!user) return error = { message: 'User with given Id not found'};
    }
    catch(error){
        console.log(error);
    }
};

const updateUserById = async (req, res) =>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }, {new: true});
        if(!user) return error = { message: 'Could not find user with given ID'};
        return user;
    }
    catch(error){
        console.log(error);
    }
};

const deleteUserById = async (req, res) =>{
    try{
        const user = await User.findByIdAndRemove(req.params.id);
        if(!user) return error = { message: 'Could not find user with given ID'};
        return user;
    }
    catch(error){
        console.log(error);
    }
};

const loginUser = async (req, res) => {
    try{
        let user = await User.findOne({email: req.email});
        if(!user) return error = { message: 'Could not find user with given Id.'};

        const validPass = await bcrypt.compare(req.password, user.password);
        if(!validPass) return error = { message: 'Password Incorrect.'};

        const token = user.generateAuthToken();
        
        return {token, user} ;
    } catch (error) {
        console.log(error);
        return;
    };
};

const verifyEmail = async (req, res) => {
    try{
        const token = req.query.token;
        const user = await User.findOneAndUpdate({ emailToken: token}, {
            emailToken: "",
            isVerified: true
        });
        return user;
    }
    catch(error){
        console.log('SERVICE Verify: ' + error);
    }
};

module.exports = {createUser, getAllUsers, getUserById, updateUserById, deleteUserById, loginUser, verifyEmail};