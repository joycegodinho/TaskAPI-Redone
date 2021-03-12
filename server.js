const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');

require('./config/db');
const models = require('./models')

const port = process.env.PORT || 3000;

const typeDefs = require ('./graphql/schema');

const resolvers = require ('./graphql/resolvers');

const app = express();

app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));
app.use(cors());

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