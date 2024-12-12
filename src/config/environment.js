require ('dotenv').config();

module.exports = {
    PORT: process.env.MONGODB_URI,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRATION: process.env.JWT_EXPIRATION,
    NODE_ENV: process.env.NODE_ENV,
}