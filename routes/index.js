const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const isAuthenticated = require('../middleware/auth');

const User = require('../models/User');
const Note = require('../models/Note');

/* GET home page. */
router.get('/', isAuthenticated, async (req, res) => {
    let notes = [];

    try {
        notes = await Note.find({ user: req.session.user._id });
    } catch (err) {
        console.error(err);
    }

    res.render('index', { user: req.session.user, notes });
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.render('login', { error: 'User with this email not found' });
        }

        if (await user.comparePassword(password)) {
            req.session.user = user;
            return res.redirect('/');
        } else {
            res.render('login', { error: 'Invalid credentials' });
        }
    } catch (err) {
        console.error(err);
        res.render('login', { error: 'Error during login' });
    }
});

// register route
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { name, surname, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.render('register', { error: 'Passwords do not match' });
    }

    try {
        const newUser = new User({ name, surname, email, password });
        await newUser.save();
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.render('register', { error: 'Error during registration' });
    }
});


router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;