const express = require('express');
const router = express.Router();
const Car = require("../models/Car");
const CarType = require("../models/CarType");
const Company = require("../models/Company");
const asyncHandler = require('express-async-handler');

/* GET home page. */
router.get('/',  asyncHandler(async(req, res, next)=>{
  const cars = await Car.find({}).populate("company").limit(3).exec();
  const types = await CarType.find({}).limit(3).exec();
  const companies = await Company.find({}).limit(3).exec();
  res.render('index', { cars, types, companies });
}));

module.exports = router;
