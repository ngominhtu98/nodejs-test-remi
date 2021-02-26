const router = require('express').Router();
const { Controller } = require('../../app/modules/auths');

router.post("/login", Controller.login)
router.post("/createAndLogin", Controller.createAndLogin)
// router.post("/register", authController.register)



module.exports = router;