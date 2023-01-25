import nodemailer from 'nodemailer';
import ErrorHandler from './errorhandler';

export const sendMail = async (options) => {
    const transporter = nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD,
        }
    });

    const mailOptions = {
        from : process.env.SMTP_MAIL,
        to:options.mail,
        subject:options.subject,
        text:options.message,
    };

    await transporter.sendMail(mailOptions,(err,info)=>{
        if(err) return new ErrorHandler('Email sending failed!',400);
        transporter.close();
        return info;
    });
}