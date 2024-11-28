// Add globalThis polyfill before any other code
if (typeof globalThis === 'undefined') {
  global.globalThis = global;
}

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

let db;
const app = express();
app.use(express.static('public'));

const typeDefs = fs.readFileSync('./server/schema.graphql', 'utf-8');

const resolvers = {
  Query: {
    activitiesList: async () => {
      const activities = await db.collection('activities').find({}).toArray();
      return activities;
    }
  },
  Mutation: {
    addActivity: async (_, { activity }) => {
      // Add a counter to generate ID
      const result = await db.collection('activities').insertOne({
        ...activity,
        currentPlayers: 0,
        status: 'upcoming'
      });
      return result.ops[0];
    }
  }
};

async function connectToDb() {
  const url = 'mongodb://localhost/badminton';
  const client = new MongoClient(url, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
  });
  await client.connect();
  console.log('Connected to MongoDB');
  db = client.db();
}

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: error => {
      console.log(error);
      return error;
    }
  });
  
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
  
  try {
    await connectToDb();
    app.listen(3000, () => {
      console.log('App started on port 3000');
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
}

startServer();