const path = require('path');
const __DEV__ = require('./env/development');
const __PRO__ = require('./env/production');
const __STG__ = require('./env/staging');

// config session
var SESSION = {
    secret: "jwt-sct-new-mobile-phone-!@##@!",
    jwtSecret: "jwt-sct-new-mobile-phone-asset-!@##@!",
    cookie: { maxAge: 60000 }
}

// This is defaults config
const defaults = {
    ROOT: path.join(__dirname, ".."),
    PATH_MODELS: path.join(__dirname, "../app/models"),
    SESSION,
    DATABASE: {
        DATABASE_NAME: process.env.DATABASE_NAME,
        DATABASE_URL: process.env.DATABASE_URL
    },
}

const config = {
    development: {
        ...defaults,
        ...__DEV__
    },
    production: {
        ...defaults,
        ...__PRO__
    },
    staging: {
        ...defaults,
        ...__STG__
    }
}

module.exports = config[process.env.NODE_ENV || 'development'];