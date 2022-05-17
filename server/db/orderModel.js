const mongoose = require("mongoose")

// order schema
const OrderSchema = new mongoose.Schema({
    cart: {
        type: String, required: [true, "Please add products in cart!"], unique: false
    }, date: {
        type: String, required: [true, "Please provide a date!"], unique: false
    }, place: {
        type: String, unique: false, required: [true, "Please provide a place!"]
    }
})

// export UserSchema
module.exports = mongoose.model("Orders", OrderSchema)