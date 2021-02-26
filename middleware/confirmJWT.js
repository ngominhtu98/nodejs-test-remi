const mongoose = require("mongoose");
// const User = mongoose.model("User");
const { User } = require('../app/models/users')
const { pareJwtToken } = require("../app/utils/func");

const constants = require('../app/utils/constants')

const addToNodeLocalstorage = (key, value) => {
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }
    localStorage.setItem(key, value);
}


module.exports = async (req, res, next) => {
    let token = req.headers.authorization;

    if (token) {
        let decodedToken;
        try {
            decodedToken = pareJwtToken(token);
            await User.findById(decodedToken._id).then(async doc => {
                if(!doc || !doc.checkPassword(decodedToken.password))
                    return res.status(constants.CODE.BAD_REQUEST).json({'token':"wrong token"});

                    req.user = doc; 
                next();
            })
        } catch (err) {
           
            return res.status(constants.CODE.BAD_REQUEST).json({'token':"wrong token"});
        }
    } else {
        // addToNodeLocalstorage('fromURLAdmin', req.originalUrl)
        return res.status(constants.CODE.BAD_REQUEST).json({'token':"wrong token"});
    }
};