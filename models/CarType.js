const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const type = new Schema({
    name:{
        type:String,
        required: true,
        minLength: 3,
    },
    description: {
        type: String,
        required: true,
    },
    photoUrl: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("CarType", type);
