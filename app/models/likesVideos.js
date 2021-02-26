const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require('joi');
const STATUS = [-1, 1];
const _Schema = new Schema({
    video_id: { type: Schema.Types.ObjectId, require: true },
    created_by: { type: Schema.Types.ObjectId, require: true },
    status: { type: Number, enum: STATUS, default: STATUS[1] },
});


function validateCreate(data) {
    const schema = {
        video_id: Joi.string().required(),
        created_by: Joi.string().required(),
        status: Joi.boolean.required()
    };
    return Joi.validate(data, schema);
}

function validateEdit(data) {
    const schema = {
        video_id: Joi.string().required(),
        created_by: Joi.string().required(),
        status: Joi.boolean.required()
    };
    return Joi.validate(data, schema);
}


/**
 * Statics
 */

mongoose.set('useFindAndModify', false);
const LikesVideos = mongoose.model("LikesVideos", _Schema);
exports.validateCreate = validateCreate;
exports.validateEdit = validateEdit;
exports.LikesVideos = LikesVideos;
// exports.validateLogin = validateLogin;