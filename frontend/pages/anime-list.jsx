import React, { useState, useEffect } from "react";
import AnimeCard from "../components/AnimeCard";

const AnimeList = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWatchlist() {
      try {
        const res = await fetch("http://localhost:5000/api/users/watchlist", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }

        const data = await res.json();
        console.log("Watchlist data:", data.watchlist);

        // Extract the array from the object
        if (!data.watchlist || !Array.isArray(data.watchlist)) {
          throw new Error("Invalid response format: Expected watchlist array");
        }

        setAnimeList(data.watchlist);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchWatchlist();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-700 drop-shadow-lg">
        Anime List
      </h1>

      {loading ? (
        <p className="text-center text-xl font-semibold text-gray-600 animate-pulse">
          Loading...
        </p>
      ) : error ? (
        <p className="text-center text-red-500 text-lg font-medium bg-red-100 p-3 rounded-md">
          {error.message}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {animeList.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AnimeList;
