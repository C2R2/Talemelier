const mongoose = require("mongoose")

// user schema
const MarketScheme = new mongoose.Schema({
    // email field
    place: {
        type: String, required: [true, "Please provide a place!"], trim: true
    }, //   password field
    days: {
        type: Array, required: [true, "Please provide days!"], unique: false, trim: true
    }, hours: {
        type: Array, unique: false, trim: true, required: [true, "Please provide hours!"]
    }

})

// export UserSchema
module.exports = mongoose.model("Markets", MarketScheme)