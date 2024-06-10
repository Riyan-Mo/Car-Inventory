const asyncHandler = require("express-async-handler");
const Company = require("../models/Company");
const Car = require("../models/Car")

exports.index = asyncHandler(async(req, res, next)=>{
    const companies = await Company.find().exec();
    res.render("allCompaniesList", {companies});
})

exports.id = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const company = await Company.findById(id).exec();
    const cars = await Car.find({company}).populate("company").exec();
    res.render("companyDetails", {company, cars});
})

exports.getDelete = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const company = await Company.findById(id).exec();
    const cars = await Car.find({company}).exec();
    res.render("deleteCompany", {cars: cars, company: company});
})

exports.postDelete = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const password = req.body.password;
    if(password === process.env.PASSWORD){
        await Company.findByIdAndDelete(id);
        res.redirect("/company");
        return;
    }
    res.redirect(`/company/${id}`);
})