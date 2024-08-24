const { register } = require("module")
const mongoose = require("mongoose")
const { type } = require("os")
const { title } = require("process")

const bookSchema = new mongoose.Schema({
    title: {
        type: String
    },
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "authors"
    },
    registered: {
        type: Number
    }
})

const bookCollection = mongoose.model("books", bookSchema)

module.exports = bookCollection