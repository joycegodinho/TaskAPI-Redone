
module.exports = {
    tasks: async (_, __, { models }) => {
        return await models.Task.find({});
    },
    task: async (_, args, { models }) => {
        return await models.Task.findById(args.id);
    }
};