import nodemailer from 'nodemailer';
import ErrorHandler from './errorhandler.js';

export const sendMail = async (options) => {
    const transporter = nodemailer.createTransport({
        service:process.env.SMTP_SERVICE,
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // prod secure=true
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD,
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    const mailOptions = {
        from : `XYZ SHOP ${process.env.SMTP_MAIL}`,
        to:options.email,
        subject:options.subject,
        text:options.message,
    };

    const result = await transporter.sendMail(mailOptions);
}