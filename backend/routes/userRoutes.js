// Import required modules
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const animeController = require("../controllers/animeController");
const authMiddleware = require("../middleware/authMiddleware");

// Define route for user registration
// POST /register → Calls registerUser
router.post("/register", userController.registerUser);

// Define route for user login
// POST /login → Calls loginUser
router.post("/login", userController.loginUser);

// Define route for user logout
// POST /logout → Calls logoutUser
router.post("/logout", userController.logoutUser);

// Define protected route to get user's watchlist
// GET /watchlist → Calls authenticateUser middleware → Calls getUserWatchlist
router.get("/watchlist", authMiddleware, animeController.getWatchlist);

// Define protected route to add anime to watchlist
// POST /watchlist/add → Calls authenticateUser middleware → Calls addToWatchlist
router.post("/watchlist/add", authMiddleware, animeController.addToWatchlist);

// Define protected route to remove anime from watchlist
// DELETE /watchlist/remove → Calls authenticateUser middleware → Calls removeFromWatchlist
router.delete("/watchlist/remove", authMiddleware, animeController.removeFromWatchlist);

// Export the router
module.exports = router;