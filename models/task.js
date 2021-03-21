const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema ({
    content: {
        type: String,
        require: true
    },
    completed: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;