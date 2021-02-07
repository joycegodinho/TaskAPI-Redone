const { gql } = require('apollo-server-express');

module.exports = gql `
    scalar DateTime
    type Task {
        id: ID!
        content: String!
        completed: Boolean
        createdAt: DateTime!
        updatedAt: DateTime!
    }
    type User {
        id: ID!
        username: String
        email: String!

    }

    type Query {
        tasks: [Task!]!
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