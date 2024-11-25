const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/notes', { useNewUrlParser: true, useUnifiedTopology: true });

const taskSchema = new mongoose.Schema({
    description: { 
        type: String, 
        required: true,
        set: function(value) {
            return value.trim();
        }
    },
    completed: { type: Boolean, default: false }
}, { timestamps: true });

const noteSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true,
        set: function(value) {
            return value.trim();
        }
    },
    content: { 
        type: String, 
        required: true,
        set: function(value) {
            return value.trim();
        }
    },
    tasks: [taskSchema],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    completed: { type: Boolean, default: false }
}, { timestamps: true });

// Metodo per aggiungere un task
noteSchema.methods.addTask = function (description) {
    this.tasks.push({ description, completed: false });
    this.updatedAt = new Date();
    return this.save();
};

// Metodo per rimuovere un task
noteSchema.methods.removeTask = function (taskId) {
    const taskIndex = this.tasks.findIndex(task => task._id.toString() === taskId);
    if (taskIndex === -1) {
        throw new Error('Task not found');
    }
    this.tasks.splice(taskIndex, 1);
    this.updatedAt = new Date();
    return this.save();
};

// Metodo per aggiornare lo stato di un task
noteSchema.methods.updateTaskStatus = function (taskId, completed) {
    const task = this.tasks.id(taskId);
    if (task) {
        task.completed = completed;
        this.updatedAt = new Date();
        return this.save();
    }
    throw new Error('Task non trovato');
};

// Metodo per verificare se tutti i task sono completati
noteSchema.methods.updateNoteCompletion = function () {
    this.completed = this.tasks.every(task => task.completed);
    this.updatedAt = new Date();
    return this.save();
};

// Metodo per ottenere un task
noteSchema.methods.getTaskById = function (taskId) {
    const task = this.tasks.id(taskId);
    if (task) {
        return task;
    }
    throw new Error('Task non trovato');
};

module.exports = mongoose.model('Note', noteSchema);
