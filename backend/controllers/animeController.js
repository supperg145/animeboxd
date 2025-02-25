const axios = require("axios");
const addToWatchlist = async (req, res) => {
  try {
    // Retrieve user ID from request object
    const userId = req.user.id;

    // Extract anime ID from request body
    const { anilistId } = req.body;
    if (!anilistId) {
      return res.status(400).json({ message: "Anime ID is required" });
    }

    // Find user in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if anime ID already exists in watchlist
    const alreadyExists = user.watchList.some(
      (item) => item.anilistId === anilistId
    );
    if (alreadyExists) {
      return res
        .status(400)
        .json({ message: "Anime is already in the watchlist" });
    }

    // Add anime ID with timestamp
    user.watchList.push({ anilistId, addedAt: new Date() });

    // Save updated watchlist to database
    await user.save();

    res
      .status(200)
      .json({ message: "Anime added to watchlist", watchlist: user.watchList });
  } catch (error) {
    console.error("Add to Watchlist Error:", error);
    res
      .status(500)
      .json({ message: error.message || "Error adding to watchlist" });
  }
};

// Function to remove an anime from the user's watchlist
const removeFromWatchlist = (req, res) => {
  // Retrieve user ID from request object
  // Extract anime ID from request body
  // Remove anime ID from watchlist
  // Save updated watchlist to database
  // Return success response
};

// Function to retrieve the user's watchlist
const getWatchlist = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const watchList = user.watchList || []; // Ensure it's always an array

    if (watchList.length === 0) {
      return res.status(200).json({ watchlist: [] });
    }

    // Extract only `anilistId` values from the watchList objects
    const anilistIds = watchList.map((item) => item.anilistId);
    console.log(anilistIds);

    // Fetch details for each anime from AniList
    const animeDetails = await Promise.all(
      anilistIds.map(async (id) => {
        try {
          const query = `
            query ($id: Int) {
              Media(id: $id, type: ANIME) {
                id
                title {
                  romaji
                  english
                  native
                }
                coverImage {
                  large
                }
                episodes
                status
                description
              }
            }
          `;

          const variables = { id };
          const response = await axios.post("https://graphql.anilist.co", {
            query,
            variables,
          });

          return response.data.data.Media;
        } catch (error) {
          console.error(`Error fetching anime with ID ${id}:`, error);
          return null; // Return null for failed requests
        }
      })
    );

    // Filter out any null responses due to failed API calls
    const filteredAnimeDetails = animeDetails.filter((anime) => anime !== null);

    res.status(200).json({ watchlist: filteredAnimeDetails });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching anime data" });
  }
};

module.exports = {
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
};
