const asyncHandler = require("express-async-handler");
const Car = require("../models/Car")
const Company = require("../models/Company")
const CarType = require("../models/CarType")

exports.index = asyncHandler(async(req, res, next)=>{
    const cars = await Car.find({}).populate("company").exec();
    res.render("allCarsList", {title: "Car Inventory", cars: cars});
});

exports.id = asyncHandler(async(req, res, next)=>{
    const carId = req.params.id;
    const car = await Car.findById(carId).populate("company").populate("type").exec();
    if(car){
        res.render("carDetails", {car});
    }
    else{
        res.render("error", {title: "Couldn't find car"})
    }
})