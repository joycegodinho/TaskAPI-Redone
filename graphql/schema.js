const { gql } = require('apollo-server-express');

module.exports = gql `
    scalar DateTime
    type Task {
        id: ID!
        content: String!
        author: User!
        completed: Boolean
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
        task(id: ID!): Task!
        users: [User!]!
        me: User!
    }

    type Mutation {
        newTask(content: String!, completed: Boolean): Task!
        updateTask(id: ID!, content: String!, completed: Boolean): Task!
        deleteTask(id: ID!): Boolean!
        signUp(username: String!, email: String!, password: String!): String!
        signIn(email: String!, password: String!): String!
    }

`;