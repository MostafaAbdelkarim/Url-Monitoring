const Check = require('../models/check');
const {User} = require('../models/user');
const {Report} = require('../models/report');
const decode = require('jwt-decode');

const createCheck = async (req, res) => {
    try{
        const token = req.cookies['jwtToken'];
        const userPayload = decode(token);
        
        const user = await User.findById(userPayload.userId);
        if(!user) return error = { message: 'User with such Id not found'};

        let check = new Check({
            userId: req.userId,
            name: req.name,
            url: req.url,
            protocol: req.protocol
        });
        check = await check.save();

        let report = new Report({
            checkId: check._id,
            status: 200
        });

        report = await report.save();
        return {check, report};
    }
    catch(error){
        console.log('SERVICE ERROR: ' + error);
    }
};

const getCheck = async (req, res) => {
    try{
        //decode the payload of jwt to get the userId else return
        //search db if there exists check with checkId and userId else return
        //return check
    }
    catch(error){
        console.log('getCheck Service: ' + error);
    }
};

const updateCheck = async (req, res) => {
    try{
        //decode and get userId in variable else return
        //find check in db using checkId and userId else return
        //update check info
        //save to db
        //return updated check
    }
    catch(error){
        console.log('updateCheck Service: ' + error);
    }
};

const deleteCheck = async (req, res) => {
    try{
        //decode and get userId in variable else return
        //findAndDelete check if exists in db passing checkId and userId else return
        //remove related check report from reports collection.
        //return 200 code 
    }
    catch(error){
        console.log('deleteCheck Service: ' + error);
    }
};

module.exports = {createCheck, getCheck, updateCheck, deleteCheck};