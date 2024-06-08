const asyncHandler = require("express-async-handler");
const Company = require("../models/Company");

exports.index = asyncHandler(async(req, res, next)=>{
    const companies = await Company.find().exec();
    res.render("allCompaniesList", {companies});
})

exports.id = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const company = await Company.findById(id).exec();

    res.render("companyDetails", {company});
})