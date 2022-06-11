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
    return  {
    from: '<YourMail@hotmail.com>',
    to: userMail,
    subject: 'BostaAssessment-VerifyYourEmail',
    html: `<h2>Thanks ${userName} for registering at BostaAssessment</h2>
            <h3>Please verify your mail to continue<h4>
            <a href= "http://localhost:3000/api/users/verify-email?token=${emailToken}">Verify Link</a>`
    };
};


//email implementation for notifying the users about their checks status 

// const emailNotificationStatusUp = function (userMail, userName, checkName) {
//     return  {
//     from: '<YourMail@mail.com>',
//     to: userMail,
//     subject: 'BostaAssessment-Your Check <checkName> is now up for monitoring',
//     html: `<h2>Hey ${userName}, Your check ${checkName} is now up and running.</h2>
//             <h3>Find out it's health status through the detailed generated report<h4>`
//     };
// };


// const emailNotificationStatusDown = function (userMail, userName, checkName) {
//     return  {
//     from: '<YourMail@mail.com>',
//     to: userMail,
//     subject: 'BostaAssessment-Your Check <checkName> went down see what happened',
//     html: `<h2>Hey ${userName}, Your check ${checkName} went down.</h2>
//             <h3>Find out what happened through the detailed generated report<h4>`
//     };
// };


function sendCustomMail(mailOptions){
    try{
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log('Mail ' + error);
            }else{
                console.log('Verification email is sent to you account');
            }
        });
    }
    catch(error){
        console.log(error);
    }
};

module.exports = { mailOptions, sendCustomMail };