const modifyResponse = require('./modifyResponse');
const auth = require('./auth');
const confirmJWT = require('./confirmJWT')
module.exports = {
    auth,
    modifyResponse,
    confirmJWT
}