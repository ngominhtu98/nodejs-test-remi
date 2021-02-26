const mongoose = require("mongoose");
const LikesVideos = mongoose.model("LikesVideos");
const Serivce = require('./service');
const constants = require('../../utils/constants')
const bcrypt = require('bcryptjs');
const { validateCreate, validateEdit } = require('../../models/likesVideos')


const getOne = (req, res) => {
    let id = req.params.id;
    Serivce.getOne(id).select("-password")
        .then((data) => {
            return res.status(constants.CODE.GET_OK).json(data);
        })
        .catch((err) => {
            return res.status(constants.CODE.BAD_REQUEST).json(err.message);
        })
}


const create = (req, res) => {
    let data = req.body
    const err = validateCreate(data)
    if (err && err.error) {
        let errors = err.error && err.error.details.reduce((result, item) => {
            return {
                ...result,
                [item.path[0]]: item.message
            }
        }, {})
        return res.status(constants.CODE.BAD_REQUEST).json(errors);
    } else {
        data.password = bcrypt.hashSync(data.password, 10);
        Serivce.create(data)
            .then((data) => {
                return res.status(constants.CODE.CREATE_OK).json({
                    message: "create successful"
                });
            })
            .catch((err) => {
                return res.status(constants.CODE.BAD_REQUEST).json(err.message);
            })

    }
}

const update = (req, res) => {
    let id = req.params.id
    let data = req.body
    let err = validateEdit(data)
    if (err && err.error) {
        let errors = err.error && err.error.details.reduce((result, item) => {
            return {
                ...result,
                [item.path[0]]: item.message
            }
        }, {})
        return res.status(constants.CODE.BAD_REQUEST).json(errors);
    }
    else {
        if (req.files && req.files.img) {
            data.img = req.files.img[0]
        } else delete data.img
        Serivce.update(id, data)
            .then((data) => {
                return res.status(constants.CODE.CREATE_OK).json({
                    message: "edit successful"
                });
            })
            .catch((err) => {
                return res.status(constants.CODE.BAD_REQUEST).json(err.message);
            })
    }
}

const deleteOne = (req, res) => {
    let id = req.params.id
    Serivce.deleteOne(id)
        .then(() => {
            return res.status(constants.CODE.DELETE_OK).json({
                message: "delete successful"
            });
        })
        .catch((err) => {
            return res.status(constants.CODE.BAD_REQUEST).json(err.message);
        })
}





module.exports = {
    getOne,
    create,
    update,
    deleteOne,

}