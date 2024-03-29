const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    title: {
        type: String, required: true, trim: true
    }, price: {
        type: Number, required: true
    }, description: {
        type: String, required: true, trim: true
    }, image: {
        type: String, required: true, trim: true
    }, ref: {
        type: String, required: true, trim: true, uppercase: true
    }
})

module.exports = mongoose.model("Products", ProductSchema)