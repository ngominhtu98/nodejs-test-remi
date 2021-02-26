const mongoose = require("mongoose");
const VideoDetails = mongoose.model("VideoDetails");
const Serivce = require("./service");
const SerivceLike = require("../likesVideos/service");
const constants = require("../../utils/constants");
const bcrypt = require("bcryptjs");
const { validateCreate, validateEdit } = require("../../models/videoDetails");

const getMany = (req, res) => {
  Serivce.getMany()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
};

const getManyByUser = (req, res) => {
  let query = { created_by: req.user.id };
  Serivce.getMany(query)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
};

const likevideo = async (req, res) => {
  let video_id = req.params.id;
  let status = req.body.status;

  let queryLike = {
    video_id,
    created_by: req.user.id,
  };

  SerivceLike.getOneWhere(queryLike).then(async (data) => {
    if (data) {
      if (status === data.status) {
        if(status === 1) 
          (await Serivce.update(video_id, { $inc: { likes: -1 } }));
        if(status === -1)
          (await Serivce.update(video_id, { $inc: { disLikes: -1 } }));
        await SerivceLike.deleteOne(data._id);
      } else {
        if(status === 1 )
          (await Serivce.update(video_id, {
            $inc: { likes: 1, disLikes: -1 },
          }));
        if(status === -1 )
          (await Serivce.update(video_id, {
            $inc: { likes: -1, disLikes: 1 },
          }));
        await SerivceLike.update(data._id, { status });
      }
    } else {
      if(status === 1 ) (await Serivce.update(video_id, { $inc: { likes: 1 } }));
      if(status === -1 )
        (await Serivce.update(video_id, { $inc: { disLikes: 1 } }));
      await SerivceLike.create({ ...queryLike, status });
    }
    let returnData = await Serivce.getOne(video_id).then(data => {
      return {
        likes: data.likes,
        disLikes: data.disLikes,
        video_id: data._id
      }
    })
    return res.status(200).json(returnData);
  });
};

const getOne = (req, res) => {
  let id = req.params.id;
  Serivce.getOne(id)
    .then((data) => {
      return res.status(constants.CODE.GET_OK).json(data);
    })
    .catch((err) => {
      return res.status(constants.CODE.BAD_REQUEST).json(err.message);
    });
};

const create = async (req, res) => {
  let data = req.body;
  youTube.getById("HcwTxRuq-uk", function (error, result) {
    if (error) {
      console.log(error);
    } else {
      console.log(JSON.stringify(result, null, 2));
    }
  });
  console.log(data, "/");
  const err = validateCreate(data);
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
    Serivce.create(data)
      .then((data) => {
        return res.status(constants.CODE.CREATE_OK).json({
          message: "create successful",
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
    Serivce.update(id, data)
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
  Serivce.deleteOne(id)
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
  Serivce.deleteMany(ids)
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
  getOne,
  create,
  update,
  deleteOne,
  deleteMany,
  getManyByUser,
  likevideo,
};
