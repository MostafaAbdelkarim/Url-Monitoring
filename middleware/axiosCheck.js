const axios = require('axios');

const getStatusCode = async (url) => {
    try{
        const status = await axios.get(url, (responses) => {responses.status});
        return status;
    }
    catch(error){
        console.log(error);
    }
};

module.exports = {getStatusCode};