const { gql } = require('apollo-server-express');

module.exports = gql `
    scalar DateTime
    type Task {
        id: ID!
        content: String!
        completed: Boolean!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
    type User {
        id: ID!
        username: String!
        email: String!
        tasks: [Task!]!
    }

    type Query {
        tasks: [Task!]!
        task(id: ID!): Task!
    }

    type Mutation {
        newTask(content: String!): Task!
        updateTask(id: ID!, content: String!, completed: Boolean!): Task!
        deleteTask(id: ID!): Boolean!
        signUp(username: String!, email: String!, password: String!): String!
        signIn(username: String, email: String, password: String!): String!
    }

`;