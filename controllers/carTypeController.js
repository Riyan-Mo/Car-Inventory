const asyncHandler = require("express-async-handler");
const CarType = require("../models/CarType")
const Car = require("../models/Car");
const Company = require("../models/Company")

exports.index = asyncHandler(async(req, res, next)=>{
    const carTypes = await CarType.find({}).exec();
    res.render("allCarTypeList", {carTypes});
})

exports.id = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const type = await CarType.findById(id).exec();
    const cars = await Car.find({type}).populate("company").exec();
    res.render("carTypeDetails", {type, cars});
})

exports.getDelete = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const type = await CarType.findById(id).exec();
    const cars = await Car.find({type}).exec();
    res.render("deleteCarType", {cars, type});
})

exports.postDelete = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const password = req.body.password;
    if(password === process.env.PASSWORD){
        await CarType.findByIdAndDelete(id);
        res.redirect("/types");
        return;
    }
    res.redirect(`/types/${id}`);
})