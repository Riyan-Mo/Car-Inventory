const router = require("express").Router();
const companyController = require("../controllers/companyController");

router.get("/", companyController.index);

router.get("/:id", companyController.id);

router.get("/:id/delete", companyController.getDelete);

router.post("/:id/delete", companyController.postDelete);

module.exports = router;