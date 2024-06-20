const asyncHandler = require("express-async-handler");
const Car = require("../models/Car")
const Company = require("../models/Company")
const CarType = require("../models/CarType");
const { body, validationResult } = require("express-validator");

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

exports.getDelete = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const car = await Car.findById(id).populate("company").populate("type").exec();
    res.render("deleteCar", {car});
})

exports.deleteCar = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const password = req.body.password;
    if(password===process.env.PASSWORD){
        await Car.findByIdAndDelete(id);
        res.redirect("/");    
        return;
    }
    res.redirect(`/cars/${id}/delete`);
})

exports.getCreate = asyncHandler(async(req, res, next)=>{
    console.log("Reached here");
    res.render("carForm");
})

exports.postCreate = [
    body("model", "Empty Model")
    .trim()
    .isLength({min:3})
    .escape(),
    body("inventory", "Empty Inventory")
    .exists(),

    asyncHandler(async(req, res, next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const carDetails = req.params.body;
            const car = new Car(carDetails);
            await car.save();
            res.redirect(car.url);
        }
        else{
            res.render("carForm", {errors});
        }
    })
]

exports.getUpdate = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const car = await Car.findById(id).populate("company").populate("type").exec();
    const companies = await Company.find({}).exec();
    const types = await CarType.find({}).exec();
    res.render("carForm", {car, companies, types})
})

exports.postUpdate = asyncHandler(async(req, res, next)=>{
    
})