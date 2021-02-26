const { User } = require('../../models/users');

const getMany = () => {
    return User.find();
}

const getOne = (id) => {
  return User.findById(id);
}
const getByEmail = (email) => {
  return User.find({email:email});
}
const create = (data) => {
    return User.create(data);
  }
  
  const update = (id,data) => {
    return User.findById(id).update(data)
  }
  
  const deleteOne = (id) => {
    return User.findByIdAndRemove(id)
  }
  
  const deleteMany = (ids) => {
    return User.deleteMany(
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
    getByEmail
}