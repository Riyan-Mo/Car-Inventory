const router = require("express").Router();
const companyController = require("../controllers/companyController");

router.get("/", companyController.index);

router.get("/create", companyController.getCreate)

router.get("/:id", companyController.id);

router.get("/:id/delete", companyController.getDelete);

router.get("/:id/update", companyController.getUpdate);

router.post("/create", companyController.postCreate);

router.post("/:id/delete", companyController.postDelete);

router.post("/:id/update", companyController.postUpdate);

module.exports = router;