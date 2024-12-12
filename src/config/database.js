const mongoose = require('mongoose');
const logger = require('./utils/logger');
const { MONGODB_URI } = require('./environment');

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger.info('MongoDB connected successfully');
    } catch (error) {
        logger.error('MongoDB connection error:', error);
        process.exit(1);
    }
};