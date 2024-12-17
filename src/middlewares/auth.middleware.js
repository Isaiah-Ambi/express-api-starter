const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/environment');
const User = require('../models/user.model');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        console.log(token)
        if (!token) {
            return res.status(401).json({ error: 'Authentication required' });

        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({
            _id: decoded.id,
            email: decoded.email
        });

        if (!user) {
            throw new Error();
        }

        reqtoken = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate' });
    }

    
};

const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Admin rights required.' });

    }
    next();
};


module.exports = {
    authMiddleware,
    adminMiddleware
};