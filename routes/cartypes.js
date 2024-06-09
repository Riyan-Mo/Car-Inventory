const router = require("express").Router();
const carTypeController = require("../controllers/carTypeController");

router.get("/", carTypeController.index);

router.get("/:id", carTypeController.id);

module.exports = router;
