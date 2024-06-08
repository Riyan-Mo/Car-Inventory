const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const typeSchema = new Schema({
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

typeSchema.virtual("url").get(function(){
    return `/types/${this._id}`;
})

module.exports = mongoose.model("CarType", typeSchema);
