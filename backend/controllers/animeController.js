const supabase = require("../config/supabase");
const axios = require("axios");

// Add anime to watchlist
const addToWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { anilistId } = req.body;

    if (!anilistId) {
      return res.status(400).json({ message: "Anime ID is required" });
    }

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("id", userId)
      .single();

    if (userError || !user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if anime already exists in the user's watchlist
    const { data: existingEntry, error: existingError } = await supabase
      .from("watchlist")
      .select("*")
      .eq("user_id", userId)
      .eq("anilist_id", anilistId)
      .single();

    if (existingEntry) {
      return res.status(400).json({ message: "Anime already in watchlist" });
    }

    // Insert new entry into the watchlist table
    const { data: newEntry, error: insertError } = await supabase
      .from("watchlist")
      .insert([
        {
          user_id: userId,
          anilist_id: anilistId,
          added_at: new Date().toISOString(),
        },
      ]);

    if (insertError) {
      return res
        .status(500)
        .json({ message: "Failed to add to watchlist", error: insertError });
    }

    res
      .status(200)
      .json({ message: "Anime added to watchlist", data: newEntry });
  } catch (error) {
    console.error("Add to Watchlist Error:", error);
    res.status(500).json({ message: "Error adding to watchlist" });
  }
};

const removeFromWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { anilistId } = req.body;

    if (!anilistId) {
      return res.status(400).json({ message: "Anime ID is required" });
    }

    // Delete the entry from the watchlist table
    const { error: deleteError } = await supabase
      .from("watchlist")
      .delete()
      .eq("user_id", userId)
      .eq("anilist_id", anilistId);

    if (deleteError) {
      return res
        .status(500)
        .json({
          message: "Failed to remove from watchlist",
          error: deleteError,
        });
    }

    res.status(200).json({ message: "Anime removed from watchlist" });
  } catch (error) {
    console.error("Remove from Watchlist Error:", error);
    res.status(500).json({ message: "Error removing from watchlist" });
  }
};

// Get user's watchlist with anime details
const getWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("User ID:", userId);

    // Fetch user's watchlist from Supabase
    const { data: watchlistEntries, error: userError } = await supabase
      .from("watchlist")
      .select("anilist_id")
      .eq("user_id", userId);

    if (userError) {
      return res
        .status(500)
        .json({ message: "Failed to fetch watchlist", error: userError });
    }

    // If no entries are found, return an empty array
    if (!watchlistEntries || watchlistEntries.length === 0) {
      return res.status(200).json({ watchlist: [] });
    }

    // Extract anilist_id values from the watchlist entries
    const animeIds = watchlistEntries.map((entry) => entry.anilist_id);

    // Fetch details for each anime from AniList API
    const animeDetails = await Promise.all(
      animeIds.map(async (id) => {
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
          return null;
        }
      })
    );

    // Remove failed API responses (null values)
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
