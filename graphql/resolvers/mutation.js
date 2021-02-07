const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthenticationError, ForbiddenError } = require('apollo-server-express');
require('dotenv').config();
const mongoose = require('mongoose');

module.exports = {
    newTask: async (_, args, { models, user }) => {
        if (!user) {
            throw new AuthenticationError('You must be signed in to create a task');
        }
        let taskValue = { 
            content: args.content,
            completed: args.completed,
            author: mongoose.Types.ObjectId(user.id)
        }
        return await models.Task.create(taskValue);
    },

    updateTask: async (_, { id, content, completed }, { models, user }) => {
        if (!user){
            throw new AuthenticationError('You must be signed in to update a task')
        }
        let task = models.Note.findById(id);
        if (task && String(task.author) !== user.id) {
            throw new ForbiddenError("You don't have permission to update this task")
        }
        try{
            return await models.Task.findByIdAndUpdate(id, { $set: { content, completed }}, {new: true });
        }catch(err){
            return err;
        }


    },

    deleteTask: async (_, { id }, { models, user }) => {
        if (!user){
            throw new AuthenticationError('You must be signed in to delete a task')
        }
        let task = models.Note.findById(id);
        if (task && String(task.author) !== user.id) {
            throw new ForbiddenError("You don't have permission to delete this task")
        }
        try{
            await task.remove();
            return true;

        }catch(err){
            return false;

        }
    },

    signUp: async (_, { username, email, password }, { models }) => {
        email = email.trim().toLowerCase();
        const hashed = await bcrypt.hash(password, 10);
        try{
            const user = await models.User.create({ 
                username,
                email,
                password: hashed
            });
            return jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        }catch(err){
            console.log(err);
            throw new Error ('Error creating account');

        }

    },
    signIn: async (_, { email, password }, { models }) => {
        
        email = email.trim().toLowerCase();
        
        const user = await models.User.findOne({ email });
        if (!user) {
           throw new AuthenticationError('Error signing in');
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid){
           throw new AuthenticationError('Error signing in');
        }
        return jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    }
}