const router = require("express").Router();
const carsController = require("../controllers/carController");

router.get("/", carsController.index);

router.get("/:id", carsController.id);

module.exports = router;