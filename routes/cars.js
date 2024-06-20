const router = require("express").Router();
const carsController = require("../controllers/carController");

router.get("/", carsController.index);

router.get("/create", carsController.getCreate);

router.get("/:id", carsController.id);

router.get("/:id/delete", carsController.getDelete);

router.post("/:id/delete", carsController.deleteCar)

// router.post("/create", carsController.postCreate);

// router.get("/:id/update", carsController.getUpdate);

// router.post("/:id/update", carsController.postUpdate);

module.exports = router;