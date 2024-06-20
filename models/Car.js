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
        ref: "Company",
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: "CarType",
    },
    stock:{
        type: Number,
        min: 0,
        required: true,
        default: 1,
    },
    maxSpeed: {
        type: Number,
    },
    horsepower: {
        type: Number,
    },
    year:{
        type: Number,
        max: new Date().getUTCFullYear(),
    },
    imgUrl:{
        type: String,
    }
})

car.virtual("url").get(function(){
    return `/cars/${this._id}`;
})

module.exports = mongoose.model("Car", car);