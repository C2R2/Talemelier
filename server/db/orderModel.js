const mongoose = require("mongoose")

// order schema
const OrderSchema = new mongoose.Schema({
    cart: {
        type: Array, required: [true, "Please add products in cart!"], unique: false
    }, date: {
        type: String, required: [true, "Please provide a date!"], unique: false
    }, place: {
        type: String, unique: false, required: [true, "Please provide a place!"]
    }, user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "Please provide a user!"]
    }
})

// export UserSchema
module.exports = mongoose.model("Orders", OrderSchema)