const mailer = require('nodemailer')
const cfMailer = require('./cf_mailer')

/** 
 * @to mail nguoi nhan
 * @subject text
 * @content mail
 * @callback function
*/
module.exports = function (to, subject, content, callback) {

    let smtpTransport =  mailer.createTransport({

        service: cfMailer.service,
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: cfMailer.email, // generated ethereal user
            pass: cfMailer.password  // generated ethereal password
        },

      });
    let mail = {
        from: 'EXT TRADE',
        to: to,
        subject: subject,
        html: content
    };

     smtpTransport.sendMail(mail, function (error, response) {
        if (error) {
            if (callback == null || typeof callback == "undefined") {
            } else {
                callback({error: true, message: "send mail error!"});
            }
        } else {
            if (callback == null || typeof callback == "undefined") {
            } else {
                callback({error: false, message: "send mail success!"});
            }
        }

        // smtpTransport.close();
    });
};