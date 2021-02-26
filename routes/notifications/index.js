const router = require('express').Router();
const { ControllerNotifications } = require('../../app/modules/notifications');


router.get("/view", ControllerNotifications.getMany)
router.get("/viewAll", ControllerNotifications.getJoinMany)
router.get("/viewByUser", ControllerNotifications.getManyByUser)
router.get("/view/:id", ControllerNotifications.getOne)
router.post("/create", ControllerNotifications.create)
router.put("/update/:id", ControllerNotifications.update)
router.delete("/delete/:id", ControllerNotifications.deleteOne)
router.delete("/delete/", ControllerNotifications.deleteMany)


module.exports = router;