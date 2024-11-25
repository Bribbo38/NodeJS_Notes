const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Pagina per creare una nuova nota
router.get('/new', (req, res) => {
    res.render('note', { user: req.session.user, note: null, error: null });
});

// Crea una nuova nota
router.post('/create', async (req, res) => {
    const { title, content, tasks } = req.body;

    try {
        const newNote = new Note({
            title,
            content,
            tasks: tasks ? tasks.map(task => ({ description: task.description.trim(), completed: task.completed === 'true' })) : [],
            user: req.session.user._id,
        });
        await newNote.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.render('note', { error: 'Error creating the note' });
    }
});

// Pagina per modificare una nota esistente
router.get('/edit/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note){
            return res.redirect('/');
        }

        res.render('note', { note, error: null });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

// Aggiorna una nota esistente
router.put('/store/:id', async (req, res) => {
    const { title, content, tasks } = req.body;

    try {
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {
                title,
                content,
                tasks: tasks ? tasks.map(task => ({ description: task.description.trim(), completed: task.completed === 'true' })) : [],
            },
            { new: true }
        );
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.render('note', { error: 'Error updating the note', note: await Note.findById(req.params.id) });
    }
});

// Elimina una nota esistente
router.get('/delete/:id', async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);

        if (!note) {
            return res.status(404).send('Note not found');
        }

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting the note');
    }
});


// Aggiorna lo stato di completamento di un task
router.put('/task/:noteId/:taskId', async (req, res) => {
    const { completed } = req.body;

    try {
        const note = await Note.findById(req.params.noteId);
        if (!note) return res.redirect('/');

        // Aggiorna il task in base all'ID
        await note.updateTaskStatus(req.params.taskId, completed === 'true');
        await note.updateNoteCompletion();

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

// Rimuovi un task
router.delete('/task/:noteId/:taskId', async (req, res) => {
    try {
        const note = await Note.findById(req.params.noteId);
        if (!note) return res.redirect('/');

        await note.removeTask(req.params.taskId);

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

module.exports = router;
