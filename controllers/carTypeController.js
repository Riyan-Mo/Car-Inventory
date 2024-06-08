const asyncHandler = require("express-async-handler");
const CarType = require("../models/CarType")

exports.index = asyncHandler(async(req, res, next)=>{
    const carTypes = await CarType.find({}).exec();
    res.render("allCarTypeList", {carTypes});
})