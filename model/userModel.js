const { register } = require("module")
const mongoose = require("mongoose")
const { type } = require("os")
const { title } = require("process")

const userSchema = new mongoose.Schema({
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

const userCollection = mongoose.model("users", userSchema)

module.exports = userCollection