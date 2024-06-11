const db = require('../Models/Model');
const bcrypt = require('bcrypt');
const errorHandler = require('../utils/errorHandler');
require('dotenv').config();
const nodemailer = require('nodemailer');
const { emailConfig } = require('../config/config');

const signUp = async (req, res) => {
    const { email, password, fullname: username } = req.body;

  db.getEmails(email, (err, data) => {
    if (err) return errorHandler(res, err);

    if (data.length > 0) {
      return res.status(400).json({ error: 'Email Already Exists' });
    }
   
    const hash = hashPassword(password)
    const userdata = { username, email, password: hash };

    db.signup(userdata, (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'User not signed up' });
      }
      res.status(200).json({ success: 'User signed up' });
    });
  });
};

const hashPassword = (password) => { 

    const salt = bcrypt.genSaltSync(process.env.SALT_ROUNDS); 
    
    return bcrypt.hashSync(password, salt); 
    
    }; 


const login = async (req, res) => {
    const { email, password } = req.body;

    db.login(email, (err, data) => {
      if (err) return errorHandler(res, err);
  
      if (data.length > 0 && bcrypt.compareSync(password, data[0].password)) {
        res.send(data);
      } else {
        res.status(401).json({ error: 'Email or password incorrect' });
      }
    });
};

const email = async (req, res) => {
    const { email, otp } = req.body;

    const transporter = nodemailer.createTransport(emailConfig);
    const mailData = {
      from: '"hello 👻" <hello@gmail.com>',
      to: email,
      subject: 'Email confirmation mail',
      html: `<div>Your email verification code is ${otp}</div>`
    };
  
    transporter.sendMail(mailData, (err, info) => {
      if (err) return errorHandler(res, err, 'Failed to send email');
      res.status(200).json({ message: 'Email sent successfully', info });
    });
};



module.exports = { signUp, login,email};