const express = require("express");
const router = express.Router();
const anilistController = require("../controllers/anilistController");

// Define routes and link them to controller functions
router.get("/searchbyid/:id", anilistController.getAnimeById);
router.get("/searchbytitle/:title", anilistController.searchAnime);
router.get("/popular", anilistController.getPopularAnime);

module.exports = router;
