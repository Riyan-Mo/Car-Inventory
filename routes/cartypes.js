const router = require("express").Router();
const carTypeController = require("../controllers/carTypeController");

router.get("/", carTypeController.index);

module.exports = router;
