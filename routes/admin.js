const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Ottieni tutti gli utenti
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.render('admin', { users, error: null, user: req.session.user });
    } catch (err) {
        res.redirect('/admin', { error: err });
    }
});

// Modifica un utente
router.post('/update/:id', async (req, res) => {
    const { name, surname, email, role } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, surname, email, role },
            { new: true }
        );

        // Se l'utente modificato è quello corrente, aggiorna la sessione
        if (req.session.user && req.session.user._id === req.params.id) {
            req.session.user = updatedUser;
        }

        res.redirect('/admin');
    } catch (err) {
        res.redirect('/admin', { error: err });
    }
});

// Elimina un utente
router.post('/delete/:id', async (req, res) => {
    try {
        // Controlla se l'utente eliminato è quello corrente
        if (req.session.user && req.session.user._id === req.params.id) {
            await User.findByIdAndDelete(req.params.id);
            req.session.destroy();
            return res.redirect('/login');
        }

        // Se non è l'utente corrente, elimina normalmente
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/admin');
    } catch (err) {
        res.redirect('/admin', { error: err });
    }
});

// Crea un nuovo utente
router.post('/create', async (req, res) => {
    const { name, surname, email, password, role } = req.body;
    try {
        const newUser = new User({ name, surname, email, password, role });
        await newUser.save();
        res.redirect('/admin');
    } catch (err) {
        res.redirect('/admin', { error: err });
    }
});

// Reset password di un utente
router.post('/reset-password/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new Error('User not found');
        }

        // Imposta una nuova password di default
        const newPassword = 'Admin$00';
        user.password = newPassword;
        await user.save();

        res.redirect('/admin');
    } catch (err) {
        res.redirect('/admin', { error: err.message });
    }
});

module.exports = router;
