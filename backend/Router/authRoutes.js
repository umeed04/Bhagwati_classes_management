const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");


// Create Default Admin
router.get(
  "/create-admin",
  authController.registerAdmin
);


// Login
router.post(
  "/login",
  authController.login
);


module.exports = router;