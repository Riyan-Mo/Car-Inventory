const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const car = new Schema({
    model:{
        type: String,
        minLength: 3,
        required: true,
    },
    company: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    type: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    stock:{
        type: Number,
        min: 0,
        required: true,
    },
    maxSpeed: {
        type: Number,
        required: true,
        default: "unknown",
    },
    acceleration: {
        type: Number,
    },
    year:{
        type: Number,
        max: new Date().getUTCFullYear(),
    },
})

module.exports = mongoose.model("Car", car);