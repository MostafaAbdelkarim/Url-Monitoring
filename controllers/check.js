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
        const {check, error} = await CheckService.getCheck();
        if(error) return res.status(400).send(error.message); 
        res.status(200).send(check);
    }
    catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    };
};

const updateCheck = async (req, res) => {
    try{
        const {check, error} = await CheckService.updateCheck(req);
        if(error) return res.status(400).send(error.message);
        res.status(200).send(check);
    }
    catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    };
};

const deleteCheck = async (req, res) => {
    try{
        const {check, sucess, error} = await CheckService.deleteCheck(req);
        if(sucess) return res.status(200).send(success.message);
        if(error.message) return res.status(400).send(error.message);
    }
    catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    };
};

module.exports = {createCheck, getCheck, updateCheck, deleteCheck};