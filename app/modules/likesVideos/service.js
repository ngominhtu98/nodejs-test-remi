const { LikesVideos } = require('../../models/likesVideos');

const getOneWhere = (query = {}) => {
  return LikesVideos.findOne(query);
}


const create = (data) => {
  return LikesVideos.create(data);
}

const update = (id, data) => {
  return LikesVideos.findByIdAndUpdate(id, data)
}

const deleteOne = (id) => {
  return LikesVideos.findByIdAndDelete(id)
}


module.exports = {
  getOneWhere,
  create,
  update,
  deleteOne,
}