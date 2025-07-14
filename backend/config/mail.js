//nodemailer 
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,//gmail ko 465 port huncha
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.EMAIL_PASS, 
  },
});

// rzmm fmau qzfw qdnu


const sendMail =async (to,otp)=>{
    transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to ,
        subject: "OTP for Password Reset", // Subject line
        html: `<p>Your OTP for password reset is <strong>${otp}</strong>. It is valid for 5 minutes.</p>`, // html body

    })
}

export default sendMail;