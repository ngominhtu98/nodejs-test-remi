const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require('joi');
const STATUS = ["blocked", "active", "pending"];

const _Schema = new Schema({
    video_id : { type: Schema.Types.ObjectId, require: true },
    status: { type: String, enum: STATUS, default: STATUS[2] },
    receiver_by: { type: Schema.Types.ObjectId, require: true },
    created_by: { type: Schema.Types.ObjectId, require: true }
});


function validateCreate(data) {
    const schema = {
        video_id: Joi.string(),
        status: Joi.string().valid(STATUS),
        receiver_by: Joi.string(),
        created_by: Joi.string(),
 
    };
    return Joi.validate(data, schema);
}

function validateEdit(data) {
    const schema = {
        video_id: Joi.string().required(),
        status: Joi.string().valid(STATUS),
        receiver_by: Joi.string().required(),
        created_by: Joi.string().required()
    };
    return Joi.validate(data, schema);
}

_Schema.virtual('videoDetail', {
    ref: 'VideoDetails',
    localField: 'video_id',
    foreignField: '_id',
    justOne: true
});

_Schema.virtual('created', {
    ref: 'User',
    localField: 'created_by',
    foreignField: '_id',
    justOne: true
});

_Schema.virtual('receiver', {
    ref: 'User',
    localField: 'receiver_by',
    foreignField: '_id',
    justOne: true
});

_Schema.set('toObject', { virtuals: true });
_Schema.set('toJSON', { virtuals: true });


/**
 * Statics
 */

mongoose.set('useFindAndModify', false);
const Notifications = mongoose.model("Notifications", _Schema);
exports.validateCreate = validateCreate;
exports.validateEdit = validateEdit;
exports.Notifications = Notifications;
// exports.validateLogin = validateLogin;