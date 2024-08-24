const express = require("express")
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")

const app = express()

app.use(express.json())
const port = process.env.PORT || 7006
require("./db")

const userRoute = require("./routes/userRoute")
const bookRoute = require("./routes/bookRoute")

app.use("/api/user", userRoute)
app.use("/api/book", bookRoute)

app.listen(port, () => {
    console.log("Server is running on", port);
})