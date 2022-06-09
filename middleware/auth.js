const config = require('config');
const jwt = require('jsonwebtoken');

function authUsingHeader(req, res, next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access Denied. No token provided');

    try{
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    }
    catch (ex){
        res.status(400).send('Invalid Token');
    }
};

const authUsingCookie = (req, res, next) => {
    const token = req.cookies['jwtToken'];
    if(token){
        const validattionToken = jwt.verify(token, config.get('jwtPrivateKey'));
        if(validattionToken){
            res.user = validattionToken.id;
            next();
        }
        else{
            console.log('Token expired');
            res.status(401).send('Access Denied, login please').redirect('localhost:3000/api/users/login');
        };
    }
    else{
        console.log('Token not found');
        res.status(403).send('Access Denied').redirect('localhost:3000/');
    }
};

module.exports = { authUsingCookie, authUsingHeader };