const Check = require('../models/check');
const {User} = require('../models/user');
const {Report} = require('../models/report');
const decode = require('jwt-decode');

const createCheck = async (req, res) => {
    try{
        const token = req.cookies['jwtToken'];
        const userPayload = decode(token);
        const user = await User.findById(userPayload._id);
        if(!user) return error = { message: 'User with such Id not found'};

        let check = new Check({
            userId: userPayload._id,
            name: req.body.name,
            url: req.body.url,
            protocol: req.body.protocol
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

const getAllChecks = async (req, res) => {
    try{
        const token = req.cookies['jwtToken'];
        const userPayload = decode(token);

        const check = await Check.find({userId: userPayload._id});
        if(!check) return error = { message: 'check not found!'};

        return {check};
    }
    catch(error){
        console.log('getCheck Service: ' + error);
    }
};

const updateCheck = async (req, res) => {
    try{
        const token = req.cookies['jwtToken'];
        const userPayload = decode(token);

        let check = await Check.findOne({userId: userPayload._id});
        if(!check) return error = { message: 'check not found!'};

        check = await Check.findOneAndUpdate({userId: userPayload._id},{
            name: req.name,
            url: req.url,
            prototype: req.prototype,
            path: req.path,
            port: req.port,
            webhook: req.webhook,
            timeout: req.timout,
            interval: req.interval,
            threshold: req.threshold,
            authentication: {
                username: req.username,
                password: req.password
            },
            httpHeaders: {},
            assert: {
                statusCode: req.statusCode
            },
            tags: req.tags,
            ignoreSSL: req.ignoreSSL
        });

        check = await check.save();
        return check;
    }
    catch(error){
        console.log('updateCheck Service: ' + error);
    }
};

const deleteCheck = async (req, res) => {
    try{
        const token = req.cookies['jwtToken'];
        const userPayload = decode(token);

        let check = await Check.findByIdAndDelete({userId: userPayload._id});
        if(!check) return error = { message: 'check not found!'};

        let report = await Report.findByIdAndDelete({checkId: userPayload._id});
        if(!report) return error = { message: 'report not found!'};

        return sucess = { message: 'Check with related report deleted successfully' };
    }
    catch(error){
        console.log('deleteCheck Service: ' + error);
    }
};

const getChecksByTag = async (req, res) => {
    try{
        const token = req.cookies['jwtToken'];
        const userPayload = decode(token);

        let check = await Check.find({userId: userPayload._id, tags: {$in: req.tags} });
        if(!check) return error = { message: 'check search by tags found!'};
        
        return check;
    }
    catch(error){
        console.log('getChecksByTag Service: ' + error);
    }
};

module.exports = {createCheck, getAllChecks, updateCheck, deleteCheck, getChecksByTag};