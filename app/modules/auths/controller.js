const { User } = require("../../models/users");
const AuthService = require("./service");
const constants = require("../../utils/constants");

const login = async (req, res) => {
  let token = await AuthService.login(req.body, res);
  return res.status(constants.CODE.GET_OK).json({ token: token });
};

const createAndLogin = async (req, res) => {
  return await AuthService.createAndLogin(req, res);
};

module.exports = {
  login,
  createAndLogin,
};
