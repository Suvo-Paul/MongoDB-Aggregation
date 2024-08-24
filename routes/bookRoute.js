const express = require("express")

const router = express.Router()

const bookController = require("../controllers/bookController")

router.get("/getAuthorDetails" , bookController.authorDetails)

module.exports = router