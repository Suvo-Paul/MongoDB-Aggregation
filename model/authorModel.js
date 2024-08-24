const { register } = require("module")
const mongoose = require("mongoose")
const { type } = require("os")
const { title } = require("process")


const authorSchema = new mongoose.Schema({
    name: {
        type: String
    },
    isActive: {
        type: Boolean
    },
    registered: {
        type: Number
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
    eyeColor: {
        type: String
    },
    favoriteFruit: {
        type: String
    }
})
const authorCollection = mongoose.model("authors", authorSchema)

module.exports = authorCollection