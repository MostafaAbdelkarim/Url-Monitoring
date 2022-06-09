const nodemailer = require('nodemailer');
const config = require('config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.get('userMail'),
        pass: config.get('userPass')
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = { transporter };