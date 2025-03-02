const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const router = require("express").Router();

router.get("/status", authMiddleware, authController.checkAuth);

module.exports = router;