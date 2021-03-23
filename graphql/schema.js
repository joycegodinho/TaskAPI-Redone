const { gql } = require('apollo-server-express');

module.exports = gql `
    scalar DateTime
    type Task {
        id: ID!
        content: String!
        author: User!
        completed: String
        createdAt: DateTime!
        updatedAt: DateTime!
    }
    type User {
        id: ID!
        username: String
        email: String!

    }
    type TaskFeed {
        tasks: [Task!]!
        cursor: String!
        hasNextPage: Boolean!

    }

    type Query {
        tasks(cursor: String): TaskFeed
        tasksToDo(cursor: String): TaskFeed
        task(id: ID!): Task!
        users: [User!]!
        me: User!
    }

    type Mutation {
        newTask(content: String!, completed: String): Task!
        updateTask(id: ID!, content: String!, completed: String): Task!
        deleteTask(id: ID!): Boolean!
        signUp(username: String!, email: String!, password: String!): String!
        signIn(email: String!, password: String!): String!
    }

`;