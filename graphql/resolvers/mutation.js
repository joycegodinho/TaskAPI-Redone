const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthenticationError, ForbiddenError } = require('apollo-server-express');
require('dotenv').config();

module.exports = {
    newTask: async (_, args, { models }) => {
        let taskValue = { 
            content: args.content,
            completed: false
        }
        return await models.Task.create(taskValue);
    },

    updateTask: async (_, { id, content, completed }, { models }) => {
        return await models.Task.findByIdAndUpdate(id, { $set: { content, completed }}, {new: true });

    },

    deleteTask: async (_, { id }, { models }) => {
        try{
            await models.Task.findByIdAndRemove(id);
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
    signIn: async (_, { username, email, password }, { models }) => {
        if (email) {
            email = email.trim().toLowerCase();
        }
        const user = await models.User.findOne({ $or: [{ email }, { username }]});
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