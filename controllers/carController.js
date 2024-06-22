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
    const companies = await Company.find().exec();
    const types = await CarType.find().exec();
    console.log("Reached here")
    res.render("carForm", {companies, types});
})

exports.postCreate = [
    body("model", "Model is not valid")
    .exists()
    .trim()
    .isLength({min: 3})
    .escape(),
    body("stock", "Stock is not valid")
    .exists()
    .isNumeric({min: 0}),
    body("maxSpeed", "Max speed is not valid")
    .isNumeric({min: 60}),
    body("horsepower", "Horsepower is not valid")
    .isNumeric({min: 500}),
    body("year", "Year is not valid")
    .isNumeric({min: 1890, max: new Date().getFullYear()}),
    body("imgUrl", "Image Url is not valid")
    .isString({min: 10}),

    asyncHandler(async(req, res, next)=>{
        const errors = validationResult(req);
        const carDetails = req.body;
        if(errors.isEmpty()){
            const car = new Car(carDetails);
            await car.save();
            res.redirect(car.url);
        }
        else{
            console.log(errors)
            const companies = await Company.find().exec();
            const types = await CarType.find().exec();
            res.render("carForm", {errors: errors.errors.map(e=>e.msg), car: carDetails, companies, types});
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

exports.postUpdate = [
    body("model", "Model is not valid")
    .exists()
    .trim()
    .isLength({min: 3})
    .escape(),
    body("stock", "Stock is not valid")
    .exists()
    .isNumeric({min: 0}),
    body("maxSpeed", "Max speed is not valid")
    .isNumeric({min: 60}),
    body("horsepower", "Horsepower is not valid")
    .isNumeric({min: 500}),
    body("year", "Year is not valid")
    .isNumeric({min: 1890, max: new Date().getFullYear()}),
    body("imgUrl", "Image Url is not valid")
    .isString({min: 10}),

    asyncHandler(async(req, res, next)=>{
        const errors = validationResult(req);
        const carId = req.params.id;
        if(errors.isEmpty()){
            const carDetails = req.body;
            console.log(carDetails)
            const updatedCar = await Car.findByIdAndUpdate(carId, carDetails);
            console.log(updatedCar)
            res.redirect(updatedCar.url);
        }
        else{
            const car = await Car.findById(carId).populate("company").populate("type").exec();
            const companies = await Company.find().exec();
            const types = await CarType.find().exec();
            res.render("carForm", {car, companies, types, errors: errors.errors.map(e=>e.msg)});
        }
    })
]