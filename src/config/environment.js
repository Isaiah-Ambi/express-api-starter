require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/starter",
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRATION: process.env.JWT_EXPIRATION,
    NODE_ENV: process.env.NODE_ENV,
}