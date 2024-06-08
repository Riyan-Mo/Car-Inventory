const router = require("express").Router();
const companyController = require("../controllers/companyController");

router.get("/", companyController.index);

router.get("/:id", companyController.id);

module.exports = router;