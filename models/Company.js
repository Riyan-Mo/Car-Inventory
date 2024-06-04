const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const company = new Schema({
    name:{
        type: String,
        required: true,
        minLength: 3,
    },
    established: {
        type: Number,
        required: true,
        max: new Date(),
    },
    country:{
        type: String,
        minLength: 3,
        required: true,
    },
    description: {
        type: String,
        required: true,
        default: "A company that produces world class cars",
    },
    imgUrl: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Company", company);