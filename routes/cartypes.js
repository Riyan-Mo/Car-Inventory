const router = require("express").Router();
const carTypeController = require("../controllers/carTypeController");

router.get("/", carTypeController.index);

router.get("/create", carTypeController.getCreate);

router.get("/:id", carTypeController.id);

router.get("/:id/delete", carTypeController.getDelete);

router.get("/:id/update", carTypeController.getUpdate);

router.post("/create", carTypeController.postCreate);

router.post("/:id/delete", carTypeController.postDelete);

router.post("/:id/update", carTypeController.postUpdate);

module.exports = router;
