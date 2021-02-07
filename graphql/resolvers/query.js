
module.exports = {
    tasks: async (_, __, { models, user }) => {
        return await models.Task.find({author: user.id});
    },
    task: async (_, args, { models }) => {
        return await models.Task.findById(args.id);
    },
    users: async (_, __, { models }) => {
        return await models.User.find({});
    },
    me: async (_, __, { models, user }) => {
        return await models.User.findById(user.id);
    }
};