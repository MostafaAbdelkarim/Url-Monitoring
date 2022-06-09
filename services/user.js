const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const crypto = require('crypto');
const emailVerifier = require('../middleware/emailVerifier');

const createUser = async (req, res) => {

    let user = await User.findOne({email: req.email});
    if(user) return;
    
    // user = new User(_.pick(req, ['name', 'email', 'password']));
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

    let mailOptions = {
        from: '"Verify Your Email" <roller1911@hotmail.com>',
        to: user.email,
        subject: 'BostaAssessment-VerifyYourEmail',
        html: `<h2>Thanks ${user.name} for registering at BostaAssessment</h2>
                <h3>Please verify your mail to continue<h4>
                <a href= "http://localhost:3000/api/users/verify-email?token=${user.emailToken}">Verify Link</a>`
    };

    console.log('EmailToken: ' + user.emailToken);
    emailVerifier.transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log('SERVICE error: ' + error);
        }else{
            console.log('Verification email is send to you account');
        }

    });

    const token = user.generateAuthToken();
    return {user, token};
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
        return user;
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
        if(!user) return console.log('Could not find user with given ID');
        return user;
    }
    catch(error){
        console.log(error);
    }
};

const deleteUserById = async (req, res) =>{
    try{
        const user = await User.findByIdAndRemove(req.params.id);
        if(!user) return console.log('Could not find user with given ID');
        return user;
    }
    catch(error){
        console.log(error);
    }
};

const loginUser = async (req, res) => {
    try{
        let user = await User.findOne({email: req.email});
        if(!user) return;

        const validPass = await bcrypt.compare(req.password, user.password);
        if(!validPass) return;

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