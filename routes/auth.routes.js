const router = require("express").Router();

const verifyToken = require("../middleware/verifyToken");
const authController = require('../controllers/auth.controller')

// Public Routes
router.post("/sign-up", authController.signUp );
router.post("/sign-in",  authController.signIn);

// Protected Route
router.get("/me", verifyToken, authController.verifyUser);

module.exports = router;
