const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require('joi');
const bcrypt = require("bcryptjs");
const dataMigrate = require('../../database/seeds/users')
const STATUS = ["blocked", "active", "pending"];

const _Schema = new Schema({
    fullname: { type: String},
    password: { type: String, required: false },
    email: { type: String, unique: true, index:true },

    status: { type: String, enum: STATUS, default: STATUS[1] },
});


function validateCreateUser(data) {
    const schema = {
        fullname: Joi.string().min(1).max(30),
        password:  Joi.string().min(5).max(255).allow(''),
        email: Joi.string().min(5).max(100).required().email(),
        status: Joi.string().valid(STATUS),
    };
    return Joi.validate(data, schema);
}

function validateEditUser(data) {
    const schema = {
        fullname: Joi.string().min(1).max(30),
        password:  Joi.string().min(5).max(255).allow(''),
        email: Joi.string().min(5).max(100).required().email(),
        status: Joi.string().valid(STATUS),
    };
    return Joi.validate(data, schema);
}
// const dataMigrate = [
//     {
//         email: 'admin@gmail.com',
//         username: "admin",
//         password: dfPass,
//         role: 'ADMIN',
//       },
//       {
//         email: 'staff-1@abc.com',
//         username: "ketoan",
//         password: dfPass,
//         role: 'ACCOUNTANT_CP',
//       },
//       {
//         email: 'chef-1@abc.com',
//         username: "ketoanbophan",
//         password: dfPass,
//         role: 'ACCOUNTANT_BR',
//       }
// ];

_Schema.statics.getMigrateData = function () {
    return dataMigrate;
}
/**
 * virtual
 */

// function validateLogin(user) {
//     const schema = {
//         username: Joi.string().regex(/^[a-zA-Z0-9\_]+$/).min(3).max(50).required(),
//         password: Joi.string().min(5).max(255).required()
//     };
//     return Joi.validate(user, schema);
// }

_Schema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

/**
 * Statics
 */

mongoose.set('useFindAndModify', false);
const User = mongoose.model("User", _Schema);
exports.validateCreateUser = validateCreateUser;
exports.validateEditUser = validateEditUser;
exports.User = User;
// exports.validateLogin = validateLogin;