const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Note = require('../models/Note');

router.get('/', (req, res) => {
    res.render('profile', { user: req.session.user, error: null });
});

router.post('/update/name', async (req, res) => {
    const { name, surname } = req.body;
    console.log(name, surname);
    try {
        await User.findByIdAndUpdate(req.session.user._id, { name, surname });
        res.redirect('/profile');
    } catch (err) {
        console.error(err);
        res.redirect('/profile');
    }
});

router.post('/update/password', async (req, res) => {
    const { newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
        return res.redirect('/profile');
    }
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(req.session.user._id, { password: hashedPassword });
        res.redirect('/profile');
    } catch (err) {
        console.error(err);
        res.redirect('/profile');
    }
});

router.post('/delete', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.session.user._id);
        await Note.deleteMany({ user: req.session.user._id });
        req.session.destroy();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.redirect('/profile');
    }
});

module.exports = router;
