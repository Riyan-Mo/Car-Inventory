const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const type = new Schema({
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
