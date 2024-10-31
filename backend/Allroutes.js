const router = require("express").Router();
const { login ,signup,confirmPassword,changePassword} = require("../backend/controllers/get_set");
const jwt = require('jsonwebtoken');

// Middleware to check JWT

// Use the middleware in your routes
router.post("/getdata",login);
router.post("/change-password",changePassword);
router.post("/signup",signup);
router.post("/confirm",confirmPassword);



module.exports = router;
