const express = require("express");

const authController = require('../controller/auth')

const router = express.Router();

router
  .post("/", authController.Signup)
  .post("/login", authController.Login)

exports.router = router;
