const express = require('express');
const router = express.Router()
const {AuthorizationValidation }= require("../validator/AuthorizationValidator")
const userController = require("../controllers/userController")
router.route("/users/signup").post(userController.SignUpUsers)
router.route("/users/current").get(AuthorizationValidation,userController.getCurrentUser)
router.route("/users/login").post(userController.loginUser)
router.route("/users/verify/:otp").get(AuthorizationValidation, userController.VerifyOtp)
router.route("/users/resendotp").post(userController.ResendOtp)
router.route("/users/admin/signup").post(userController.SignUpAdmin)
router.route("/users/forgottenpassword").post(userController.forgottenPassword)
module.exports = router