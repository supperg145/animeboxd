const axios = require("axios");

const ANILIST_API_URL = "https://graphql.anilist.co";

// Helper function to make GraphQL requests
const makeAnilistRequest = async (query, variables = {}) => {
  try {
    const response = await axios.post(
      ANILIST_API_URL,
      { query, variables },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("AniList API request failed:", error);
    throw new Error("Failed to fetch data from AniList API");
  }
};

// Fetch anime details by ID
exports.getAnimeById = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: "Invalid anime ID" });
  }

  const query = `
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
      trailer {
        id
        site
        thumbnail
      }
      genres
      averageScore
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      studios {
        edges {
          node {
            name
          }
        }
      }
    }
  }
`;

  try {
    const data = await makeAnilistRequest(query, { id: parseInt(id) });
    res.json(data.Media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search anime by title
exports.searchAnime = async (req, res) => {
  const { title, page = 1, perPage = 10 } = req.query;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const query = `
    query ($search: String, $page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
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
  `;

  try {
    const data = await makeAnilistRequest(query, {
      search: title,
      page: parseInt(page),
      perPage: parseInt(perPage),
    });
    res.json(data.Page.media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch popular anime
exports.getPopularAnime = async (req, res) => {
  const { page = 1, perPage = 10 } = req.query;

  const query = `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
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
  `;

  try {
    const data = await makeAnilistRequest(query, {
      page: parseInt(page),
      perPage: parseInt(perPage),
    });
    res.json(data.Page.media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
