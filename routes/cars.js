const router = require("express").Router();
const carsController = require("../controllers/carController");

router.get("/", carsController.index);

router.get("/:id", carsController.id);

router.get("/:id/delete", carsController.getDelete);

router.post("/:id/delete", carsController.deleteCar)

// router.get("/:id/create", carsController.getCreate);

// router.post("/:id/create", carsController.createCar);

router.get("/:id/update", carsController.getUpdate);

// router.post("/:id/update", carsController.updateCar);

module.exports = router;