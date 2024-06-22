const asyncHandler = require("express-async-handler");
const CarType = require("../models/CarType")
const Car = require("../models/Car");
const Company = require("../models/Company")
const {body, validationResult} = require("express-validator");

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

exports.getCreate = (req, res, next)=>{
    res.render("carTypeForm");
}

exports.postCreate = [
    body("name", "Type name is not valid.")
    .exists()
    .isString({min:3})
    .escape(),

    body("photoUrl", "Photo Url is not valid.")
    .exists()
    .isString({min: 10}),

    body("description", "Description is not valid.")
    .exists()
    .isString({min: 10})
    .escape(),

    asyncHandler(async(req, res, next)=>{
        const errors = validationResult(req);
        const typeDetails = req.body;
        if(errors.isEmpty()){
            const type = await new CarType(typeDetails).save();
            res.redirect(type.url);
        }
        else{
            res.render("carTypeForm", {type: typeDetails, errors: errors.errors.map(e=>e.msg)});
        }
    })
]

exports.getUpdate = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const type = await CarType.findById(id).exec();
    res.render("carTypeForm", {type});
})

exports.postUpdate = [
    body("name", "Type name is not valid.")
    .exists()
    .isString({min:3})
    .escape(),

    body("photoUrl", "Photo Url is not valid.")
    .exists()
    .isString({min: 10}),

    body("description", "Description is not valid.")
    .exists()
    .isString({min: 10})
    .escape(),

    asyncHandler(async(req, res, next)=>{
        const errors = validationResult(req);
        const typeDetails = req.body;
        if(errors.isEmpty()){
            const id = req.params.id;
            const updatedType = await CarType.findByIdAndUpdate(id, typeDetails).exec();
            res.redirect(updatedType.url);
        }
        else{
            res.render("carTypeForm", {type: typeDetails, errors: errors.errors.map(e=>e.msg)});
        }
    })
]