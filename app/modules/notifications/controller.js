const mongoose = require("mongoose");
const Service = require("./service");
const ServiceLike = require("../likesVideos/service");
const ServiceVideo = require("../videoDetails/service");
const ServiceUsers = require("../users/service");

const constants = require("../../utils/constants");
const bcrypt = require("bcryptjs");
const { validateCreate, validateEdit } = require("../../models/notifications");

const getMany = async (req, res) => {
  Service.getMany()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
};

const getManyByUser = async (req, res) => {
  let query = [{ created_by: req.user._id }, { receiver_by: req.user._id }];
  await Service.getManyByUser(query)
    .then(async (data) => {
      data = JSON.parse(JSON.stringify(data));
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        if (item.created_by === req.user._id.toString()) {
          item.isMeShare = true;
        }
        if (item.videoDetail) {
          let like = await ServiceLike.getOneWhere({video_id:item.video_id,created_by:req.user._id});
          item.videoDetail.liked = like ? like.status : 0;
        }
      }
      return res.status(200).json(data);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
};

const getJoinMany = async (req, res) => {
  Service.getJoinMany()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
};

const getOne = (req, res) => {
  let id = req.params.id;
  Service.getOne(id)
    .then((data) => {
      return res.status(constants.CODE.GET_OK).json(data);
    })
    .catch((err) => {
      return res.status(constants.CODE.BAD_REQUEST).json(err.message);
    });
};

const create = (req, res) => {
  let reqData = req.body;
  // const err = validateCreate(data)
  const err = false;
  if (err && err.error) {
    let errors =
      err.error &&
      err.error.details.reduce((result, item) => {
        return {
          ...result,
          [item.path[0]]: item.message,
        };
      }, {});
    return res.status(constants.CODE.BAD_REQUEST).json(errors);
  } else {
    ServiceVideo.create({
      created_by: req.user._id,
      title: reqData.title,
      description: reqData.description,
      url: reqData.url,
    })
      .then((data) => {
        ServiceUsers.getByEmail(reqData.receiver_by)
          .then((user) => {
            Service.create({
              video_id: data._id,
              created_by: req.user._id,
              receiver_by: user[0]._id,
            })
              .then((resData) => {
                return res.status(constants.CODE.CREATE_OK).json({
                  message: "create successful",
                  data: resData,
                });
              })
              .catch((err) => {
                return res.status(constants.CODE.BAD_REQUEST).json(err.message);
              });
          })
          .catch((err) => {
            return res.status(constants.CODE.BAD_REQUEST).json(err.message);
          });
      })
      .catch((err) => {
        return res.status(constants.CODE.BAD_REQUEST).json(err.message);
      });
  }
};

const update = (req, res) => {
  let id = req.params.id;
  let data = req.body;
  let err = validateEdit(data);
  if (err && err.error) {
    let errors =
      err.error &&
      err.error.details.reduce((result, item) => {
        return {
          ...result,
          [item.path[0]]: item.message,
        };
      }, {});
    return res.status(constants.CODE.BAD_REQUEST).json(errors);
  } else {
    if (req.files && req.files.img) {
      data.img = req.files.img[0];
    } else delete data.img;
    Service.update(id, data)
      .then((data) => {
        return res.status(constants.CODE.CREATE_OK).json({
          message: "edit successful",
        });
      })
      .catch((err) => {
        return res.status(constants.CODE.BAD_REQUEST).json(err.message);
      });
  }
};

const deleteOne = (req, res) => {
  let id = req.params.id;
  Service.deleteOne(id)
    .then(() => {
      return res.status(constants.CODE.DELETE_OK).json({
        message: "delete successful",
      });
    })
    .catch((err) => {
      return res.status(constants.CODE.BAD_REQUEST).json(err.message);
    });
};

const deleteMany = (req, res) => {
  let ids = req.body.ids;
  Service.deleteMany(ids)
    .then(() => {
      return res.status(constants.CODE.DELETE_OK).json({
        message: "delete successful",
      });
    })
    .catch((err) => {
      return res.status(constants.CODE.BAD_REQUEST).json(err.message);
    });
};

module.exports = {
  getMany,
  getJoinMany,
  getOne,
  create,
  update,
  deleteOne,
  deleteMany,
  getManyByUser,
};
