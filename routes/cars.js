const router = require("express").Router();
const carsController = require("../controllers/carController");

router.get("/", carsController.index);

router.get("/:id", carsController.id);

router.get("/:id/delete", carsController.getDelete);

router.post("/:id/delete", carsController.deleteCar)

module.exports = router;