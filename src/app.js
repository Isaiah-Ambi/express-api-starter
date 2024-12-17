const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./config/database');
const { PORT, NODE_ENV } = require('./config/environment');
const authRoutes = require('./routes/auth.routes');
const errorHandler = require('./middlewares/error.middleware');
const logger = require('./utils/logger');
const { authMiddleware, adminMiddleware } = require('./middlewares/auth.middleware');

const app = express();

// middleware

app.use(helmet());
app.use(cors());
app.use(express.json());

// connect db
connectDB();

// routes
app.use('/api/auth', authRoutes);

app.get('/', authMiddleware, (req, res) => {
    res.json({message: "Hello World"});
});

// error handler
app.use(errorHandler);


// start server
app.listen(PORT, () => {
    logger.info(`Server running in ${NODE_ENV} mode on port ${PORT}`);
})

module.exports = app;