const mongoose = require("mongoose")

// user schema
const MarketSchema = new mongoose.Schema({
    // email field
    place: {
        type: String, required: [true, "Please provide a place!"], trim: true
    }, days: {
        type: Array, required: [true, "Please provide days!"], trim: true
    }, hours: {
        type: Array, trim: true, required: [true, "Please provide hours!"]
    }

})

// export UserSchema
module.exports = mongoose.model("Markets", MarketSchema)