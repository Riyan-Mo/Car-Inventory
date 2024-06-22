const asyncHandler = require("express-async-handler");
const Company = require("../models/Company");
const Car = require("../models/Car")
const {body, validationResult} = require("express-validator");

const getCountries = async()=>{
    const response = await fetch("https://restcountries.com/v3.1/all?fields=name");
    const countries = await response.json();
    return countries;
}

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

exports.getCreate = asyncHandler(async(req, res, next)=>{
    const countries = await getCountries();
    res.render("companyForm", {countries});
})

exports.postCreate = [
    body("name", "Company name is invalid.")
    .isString({min:3})
    .exists()
    .escape(),

    body("established", "Company Established year is not valid.")
    .isNumeric({max: new Date().getFullYear()})
    .exists(),

    body("country", "Country not selected.")
    .exists(),

    body("description", "Description is not valid.")
    .isString({min: 10}),

    asyncHandler(async(req, res, next)=>{
        const errors = validationResult(req);
        if(errors.isEmpty()){
            const companyDetails = req.body;
            const company = await Company(companyDetails).save();
            res.redirect(company.url);
        }
        else{
            const countries = await getCountries();
            res.render("companyForm", {countries, errors: errors.errors.map(e=>e.msg)});
        }
    })
]

exports.getUpdate = asyncHandler(async(req, res, next)=>{
    const countries = await getCountries();
    const companyId = req.params.id;
    const company = await Company.findById(companyId).exec();
    console.log(company)
    res.render("companyForm", {countries, company});
})

exports.postUpdate = [
    body("name", "Company name is invalid.")
    .isString({min:3})
    .exists()
    .escape(),

    body("established", "Company Established year is not valid.")
    .isNumeric({max: new Date().getFullYear()})
    .exists(),

    body("country", "Country not selected.")
    .exists(),

    body("description", "Description is not valid.")
    .isString({min: 10}),

    asyncHandler(async(req, res, next)=>{
        const errors = validationResult(req);
        const companyDetails = req.body;
        if(errors.isEmpty()){
            const id = req.params.id;
            const updatedCompany = await Company.findByIdAndUpdate(id, companyDetails).exec();
            res.redirect(updatedCompany.url);
        }
        else{
            const countries = await getCountries();
            res.render("companyForm", {company: companyDetails, countries, errors: errors.errors.map(e=>e.msg)});
        }
    })
];