const express = require("express");
const axios = require("axios");
const router = express.Router();

// AniList GraphQL API URL
const ANILIST_API_URL = "https://graphql.anilist.co";

/**
 * Fetch anime details by ID
 * GET /anime/:id
 */
router.get("/anime/:id", async (req, res) => {
  const { id } = req.params;

  const query = {
    query: `
      query ($id: Int) {
        Media(id: $id, type: ANIME) {
          id
          title {
            romaji
            english
            native
          }
          description
          episodes
          status
          coverImage {
            large
          }
        }
      }
    `,
    variables: { id: parseInt(id) },
  };

  try {
    const response = await axios.post(ANILIST_API_URL, query, {
      headers: { "Content-Type": "application/json" },
    });

    res.json(response.data.data.Media);
  } catch (error) {
    console.error("Error fetching anime:", error);
    res.status(500).json({ message: "Failed to fetch anime details" });
  }
});

/**
 * Search anime by title
 * GET /anime/search/:title
 */
router.get("/anime/search/:title", async (req, res) => {
  const { title } = req.params;

  const query = {
    query: `
      query ($search: String) {
        Page(perPage: 10) {
          media(search: $search, type: ANIME) {
            id
            title {
              romaji
              english
              native
            }
            description
            episodes
            status
            coverImage {
              large
            }
          }
        }
      }
    `,
    variables: { search: title },
  };

  try {
    const response = await axios.post(ANILIST_API_URL, query, {
      headers: { "Content-Type": "application/json" },
    });

    res.json(response.data.data.Page.media);
  } catch (error) {
    console.error("Error searching anime:", error);
    res.status(500).json({ message: "Failed to search anime" });
  }
});

/**
 * Fetch popular anime
 * GET /anime/popular
 */
router.get("/anime/popular", async (req, res) => {
  const query = {
    query: `
        query {
          Page(perPage: 10) {
            media(type: ANIME, sort: POPULARITY_DESC) {
              id
              title {
                romaji
                english
                native
              }
              description
              episodes
              status
              coverImage {
                large
              }
            }
          }
        }
      `,
  };

  try {
    const response = await axios.post(ANILIST_API_URL, query, {
      headers: { "Content-Type": "application/json" },
    });

    res.json(response.data.data.Page.media);
  } catch (error) {
    console.error("Error fetching popular anime:", error);
    res.status(500).json({ message: "Failed to fetch popular anime" });
  }
});

module.exports = router;
