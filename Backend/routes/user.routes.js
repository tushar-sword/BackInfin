const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");


//we need to validate the data we get from the frontend
const { body } = require("express-validator");

//check if the data is valid (call Register function from controller ) and if not return the error message 
router.post( "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.registerUser, // Register user
);



//check if the data is valid (call Logini function from controller ) and if not return the error message 
router.post("/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.loginUser, // Login user
);

router.post("/userProfile", userController.userProfile); // Get user profile

module.exports = router;
