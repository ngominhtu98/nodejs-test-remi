const router = require('express').Router();
const { Controller } = require("../app/modules/users");
const { ControllerNotifications } = require("../app/modules/notifications");

router.use('/auth', require('./auth'));
router.post("/users/create", Controller.create)
router.get("/notifications/viewAll", ControllerNotifications.getJoinMany)


module.exports = router;
