module.exports = {
    author: async (task, _, { models }) => {
        return await models.User.findById(task.author)
    }
};