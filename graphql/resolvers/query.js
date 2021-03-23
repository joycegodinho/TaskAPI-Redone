
module.exports = {
    tasks: async (_, { cursor }, { user, models }) => {
        const limit = 10;
        let hasNextPage = false;
        let cursorQuery = {};

        if(cursor){
            cursorQuery = { _id: { $lt: cursor } };
        }
        let tasks = await models.Task.find({$and:[{author: user.id},cursorQuery]}).sort({ _id: -1 }).limit(limit + 1);
        if(tasks.length > limit){
            hasNextPage = true;
            tasks = tasks.slice(0,-1);
        }

        const newCursor = tasks[tasks.length - 1]._id;

        return { 
            tasks,
            cursor: newCursor,
            hasNextPage
        }
    },

    tasksToDo: async (_, { cursor }, { user, models }) => {
        const limit = 10;
        let hasNextPage = false;
        let cursorQuery = {};

        if(cursor){
            cursorQuery = { _id: { $lt: cursor } };
        }
        let tasks = await models.Task.find({$and:[{author: user.id},cursorQuery,{completed: "False"}]}).sort({ _id: -1 }).limit(limit + 1);
        if(tasks.length > limit){
            hasNextPage = true;
            tasks = tasks.slice(0,-1);
        }

        const newCursor = tasks[tasks.length - 1]._id;

        return { 
            tasks,
            cursor: newCursor,
            hasNextPage
        }
    },
    task: async (_, { id }, { models }) => {
        return await models.Task.findById(id);
    },
    users: async (_, __, { models }) => {
        return await models.User.find({});
    },
    me: async (_, __, { user, models }) => {
        return await models.User.findById(user.id);
    }
};