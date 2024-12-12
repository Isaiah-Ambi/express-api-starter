const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { registerValidation, loginValidation } = require('../utils/validation');
const { JWT_SECRET, JWT_EXPIRATION } = require('../config/environment');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware');


// register new user
router.post('/register', async (req, res) => {
    try {

        const { error } = registerValidation(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }


        const { username, email, password, role } = req.body;
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if(existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        const user = new User({ username, email, password, role });
        await user.save();

        // generate token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRATION }
        );

        res.status(201).json({
            message: 'USer registered successfully',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed', details: error.message });

    }
});


// login
router.post('/login', async (req, res) => {
    try {
        const { error } = loginValidation(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // check password

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRATION }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Login failed', details: error.message });
    }
});


router.get('/profile', authMiddleware, (req, res) => {
    res.json({
        user: {
            id: req.user._id,
            username: req.user.username,
            email: req.user.email,
            role: req.user.role
        }
    });
});


// admin-only route
router.get('/admin-dashboard',
    authMiddleware,
    adminMiddleware,
    (req, res) => {
        res.json({
            message: 'welcome to admin dashboard',
            user: req.user
        });
    }
);

module.exports = router;