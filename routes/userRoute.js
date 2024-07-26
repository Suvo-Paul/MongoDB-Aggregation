const express = require("express")

const router = express.Router()

const userController = require("../controllers/usercontroller")

router.get("/findActiveUser", userController.findActiveUser)
router.get("/averageAge", userController.avarageAge)
router.get("/fruitCount", userController.fruitCount)

module.exports = router