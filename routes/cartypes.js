const router = require("express").Router();
const carTypeController = require("../controllers/carTypeController");

router.get("/", carTypeController.index);

router.get("/:id", carTypeController.id);

router.get("/:id/delete", carTypeController.getDelete);

router.post("/:id/delete", carTypeController.postDelete);

module.exports = router;
