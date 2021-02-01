const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken')

require('./config/db');
const models = require('./models')

const port = process.env.PORT || 3000;

let tasks = [
    {id: '1', content: 'this is a task', completed: true},
    {id: '2', content: 'this is another task', completed: false},
    {id: '3', content: 'this is the third task', completed: true}
];

const typeDefs = require ('./graphql/schema');

const resolvers = require ('./graphql/resolvers');

const app = express();

const getUser = token => {
    if(token){
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        }catch(err) {
            throw new Error('Session invalid');
        }
    }
};

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: ({ req }) => {
        const token = req.headers.authorization;
        const user = getUser(token);
        console.log(user);
        return { models, user };
    }
 });

server.applyMiddleware({ app, path:'/api'});

app.listen({ port }, () =>
console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}.`)
);