const express = require("express")

const router = express.Router()

const userController = require("../controllers/usercontroller")

router.get("/findActiveUser", userController.findActiveUser)
router.get("/averageAge", userController.avarageAge)
router.get("/fruitCount", userController.fruitCount)
router.get("/genderCount", userController.genderCount)
router.get("/countryCount", userController.countryCountTop)
router.get("/eyeColor", userController.eyeColor)
router.get("/averageOfTagNumber", userController.averageOfTagNumber)
router.get("/averageOfTagNumber2", userController.averageOfTagNumber2)
router.get("/countEnimTagUsers", userController.countEnimTagUsers)
router.get("/findInactiveUser", userController.findInactiveUser)
router.get("/specialPhoneNumber", userController.specialPhoneNumber)
router.get("/recentRegistered", userController.recentRegistered)
router.get("/categorizeUser", userController.categorizeUser)
router.get("/secondTagAd", userController.secondTagAd)
router.get("/findUserWithEnimId", userController.findUserWithEnimId)
router.get("/usaLocatedCompany", userController.usaLocatedCompany)

module.exports = router