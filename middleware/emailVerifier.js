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

const mailOptions = function (userMail, userName, emailToken) {
    let options =  {
    from: '"Verify Your Email" <YourMail@hotmail.com>',
    to: userMail,
    subject: 'BostaAssessment-VerifyYourEmail',
    html: `<h2>Thanks ${userName} for registering at BostaAssessment</h2>
            <h3>Please verify your mail to continue<h4>
            <a href= "http://localhost:3000/api/users/verify-email?token=${emailToken}">Verify Link</a>`
    };
    return options;
};


function sendCustomMail(mailOptions){
    try{
        transporter.sendMail(mailOptions.options, function(error, info){
            if(error){
                console.log('Mail ' + error);
            }else{
                console.log('Verification email is send to you account' + info);
            }
        });
    }
    catch(error){
        console.log(error);
    }
};

module.exports = { mailOptions, sendCustomMail };