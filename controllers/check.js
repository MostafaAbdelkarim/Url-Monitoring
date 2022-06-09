const CheckService = require('../services/check');
const _ = require('lodash');

const createCheck = async (req, res) => {
    try{
        const {check, report, error} = result = await CheckService.createCheck(req.body);
        if(result.message) return res.status(400).send(result.message);
        return res.status(201).send(_.pick(result.check, ['name', 'url']));
    }
    catch (error){
        console.log(error);
        res.status(500).send(`Internal Server Error`);
    };
};

const getCheck = async (req, res) => {
    try{
        const user = CheckService.getCheck();
        res.status(200).send(user);
    }
    catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    };
};

const updateCheck = async (req, res) => {
    try{
        const user = await CheckService.updateCheck(req);
        res.status(200).send(user);
    }
    catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    };
};

const deleteCheck = async (req, res) => {
    try{
        const user = await CheckService.deleteCheck(req);
        res.status(200).send(user);
    }
    catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    };
};

module.exports = {createCheck, getCheck, updateCheck, deleteCheck};