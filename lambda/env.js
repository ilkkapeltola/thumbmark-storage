require ('dotenv').config();

module.exports = {
    allowedOrigins: process.env.ALLOWED_ORIGINS.split(','),
};