const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require('joi');
const STATUS = [-1, 1];
const _Schema = new Schema({
    video_id: { type: Schema.Types.ObjectId, require: true },
    comment: { type: String, require: true },
    like: { type: Number, default: 0 },
    disLike: { type: Number, default: 0 },
    display: { type: Boolean, default: true },
    created_by: { type: Schema.Types.ObjectId, require: true },
});


function validateCreate(data) {
    const schema = {
      
        video_id: Joi.string().required(),
        comment: Joi.string().required(),
        like: Joi.number(),
        disLike: Joi.number(),
        display: Joi.boolean(),
        created_by: Joi.string().required(),
    };
    return Joi.validate(data, schema);
}

function validateEdit(data) {
    const schema = {
      
        video_id: Joi.string().required(),
        comment: Joi.string().required(),
        like: Joi.number(),
        disLike: Joi.number(),
        display: Joi.boolean(),
        created_by: Joi.string().required(),
    };
    return Joi.validate(data, schema);


/**
 * Statics
 */

mongoose.set('useFindAndModify', false);
const CommentVideos = mongoose.model("CommentVideos", _Schema);
exports.validateCreate = validateCreate;
exports.validateEdit = validateEdit;
exports.CommentVideos = CommentVideos;
// exports.validateLogin = validateLogin;