const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');
const helmet = require('helmet');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const cookieSession = require('cookie-session');
const { verify } = require('crypto');
require('dotenv').config();


const PORT = 3000;
const app = express();
const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET
}

function verifyCallback(accessToken, refreshToken, profile, done) {
    console.log('Google profile', profile);
    done(null, profile);
}

passport.use(new Strategy({
    callbackURL: '/auth/google/callback',
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET
}, verifyCallback));

// Save the session to the cookie
passport.serializeUser((user, done) => {
    done(null, user);
});

// Read the session from the cookie
passport.deserializeUser((obj, done) => {
    done(null, obj);
})

app.use(helmet());
app.use(cookieSession({
    name: 'session',
    maxAge: 60 * 60 * 1000,
    keys: ['secret key']
}))
app.use(passport.initialize());
app.use(passport.session());

function checkLoggedIn(req, res, next) {  // req.user
    console.log('Current user is', req.user);
    const isLoggedIn = req.isAuthenticated() && req.user;
    if (!isLoggedIn) {
        return res.status(401).json({
            error: 'You must log in to access this resource!'
        });
    }
    next();
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/auth/google', passport.authenticate('google', {
    scope: ['email']
}) ,(req, res) => {});

app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/failure',
    successRedirect: '/',
    session: true
}), (req, res) => {
    console.log('Google called us back.');
});

app.get('/auth/logout', (req, res) => {
    req.logout();  // clears session and removes req.user
    return res.redirect('/');
});

app.get('/secret', checkLoggedIn, (req, res) => {
    return res.send('Your personal Secret Value is 42!');
})

app.get('/failure', (req, res) => {
    return res.send('Failed to log in!');
})

https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}, app).listen(PORT, () => {
    console.log(`Server is running and listening on port: ${PORT}...`);
})