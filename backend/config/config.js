// config/config.js
require('dotenv').config();

module.exports = {
    dbConfig: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'webproject'
    },
    emailConfig: {
        port: 465,
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        secure: true
    },
    allowedOrigin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173',
    port: process.env.PORT || 4000
};