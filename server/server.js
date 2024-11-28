require('dotenv').config();
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
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
      // 添加一个计数器来生成ID
      const result = await db.collection('activities').insertOne({
        ...activity,
        currentPlayers: 0,
        status: 'upcoming'
      });
      return result.ops[0];
    },
    updateUserSkillLevel: async (_, { skillLevel }, { req }) => {
      if (!req.user) {
        throw new Error('Not authenticated');
      }
      
      const result = await db.collection('users').findOneAndUpdate(
        { googleId: req.user.googleId },
        { $set: { skillLevel: skillLevel } },
        { returnOriginal: false }
      );
      
      return result.value;
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

// Add before Apollo Server setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
      const user = {
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails && profile.emails[0] ? profile.emails[0].value : null,
        lastLogin: new Date(),
        skillLevel: null
      };
      
      const existingUser = await db.collection('users').findOne({ googleId: profile.id });
      if (existingUser) {
        user.skillLevel = existingUser.skillLevel;
      }
      
      await db.collection('users').updateOne(
        { googleId: profile.id },
        { $set: user },
        { upsert: true }
      );
      
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  }
));

passport.serializeUser((user, done) => {
  try {
    done(null, user.googleId);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser(async (googleId, done) => {
  try {
    const user = await db.collection('users').findOne({ googleId });
    if (!user) {
      return done(new Error('User not found'));
    }
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Auth routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);

app.get('/api/auth/status', (req, res) => {
  res.json({
    authenticated: req.isAuthenticated(),
    user: req.user
  });
});

app.get('/api/auth/logout', (req, res) => {
  req.logout(function(err) {
    if (err) {
      return res.status(500).json({ error: 'Error logging out' });
    }
    req.session.destroy();
    res.json({ success: true });
  });
});

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
    formatError: error => {
      console.log(error);
      return error;
    }
  });
  
  await server.start();
  server.applyMiddleware({ 
    app, 
    path: '/graphql',
    cors: {
      origin: 'http://localhost:3000',
      credentials: true
    }
  });
  
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