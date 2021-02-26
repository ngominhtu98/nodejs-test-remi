const { Notifications } = require('../../models/notifications');

const getMany = () => {
    return Notifications.find();
}

const getManyByUser = (query={}) => {
  return Notifications.find({$or:[...query]}).populate([
    {
      path : "videoDetail"
    },
    {
      path : "created"
    },
    {
      path : "receiver"
    },
  ]).exec()
}

const getJoinMany = () => {


  return Notifications.find().populate([
    {
      path : "videoDetail"
    },
    {
      path : "created"
    },
    {
      path : "receiver"
    },
  ]);
}

const getOne = (id) => {
  return Notifications.findById(id);
}

const create = (data) => {
    return Notifications.create(data);
  }
  
  const update = (id,data) => {
    return Notifications.findByIdAndUpdate(id,data)
  }
  
  const deleteOne = (id) => {
    return Notifications.findByIdAndDelete(id)
  }
  
  const deleteMany = (ids) => {
    return Notifications.deleteMany(
      {
          _id: { $in: ids },
      })
  }

module.exports = {
    getMany,
    getOne,
    create,
    update,
    deleteOne,
    deleteMany,
    getJoinMany,
    getManyByUser
}