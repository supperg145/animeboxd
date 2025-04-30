import React, { useState, useEffect } from "react";
import AnimeCard from "../components/AnimeCard";

// Debounce function to limit scroll event calls
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const Browse = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchAnime = async (page) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/anime/popular?page=${page}&perPage=10`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) {
        throw new Error(`Error: ${res.status} - ${res.statusText}`);
      }

      const data = await res.json();

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setAnimeList((prevList) => [...prevList, ...data]);
      }
    } catch (error) {
      // More detailed error logging
      console.error("Error fetching anime:", error.message);
      console.log(
        "Fetch URL: ",
        `http://localhost:5000/api/anime/popular?page=${page}&perPage=10`
      );
      setError(error.message || "An error occurred while fetching anime.");
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchAnime(page);
  }, []);

  // Fetch more data when the page changes
  useEffect(() => {
    if (page > 1) {
      fetchAnime(page);
    }
  }, [page]);

  // Handle scroll event with debounce
  useEffect(() => {
    const handleScroll = debounce(() => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      if (
        scrollTop + clientHeight >= scrollHeight - 100 &&
        !loading &&
        hasMore
      ) {
        setLoading(true);
        setPage((prevPage) => prevPage + 1);
      }
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
            Popular Anime
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover the most popular anime series and movies
          </p>
        </div>

        {/* Loading state for initial load */}
        {initialLoading && (
          <div className="flex flex-col items-center justify-center h-96">
            <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-xl text-gray-300">Loading anime...</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="flex flex-col items-center justify-center h-96">
            <div className="text-red-400 text-4xl mb-4">⚠️</div>
            <p className="text-xl text-red-400 mb-6 text-center">
              Failed to load anime: {error.message}
            </p>
            <button
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-all shadow-lg"
              onClick={() => {
                setError(null);
                setLoading(true);
                fetchAnime(page);
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Anime Grid */}
        {!initialLoading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {animeList.map((anime) => (
                <AnimeCard key={anime.id} anime={anime} />
              ))}
            </div>

            {/* Loading more indicator */}
            {loading && page > 1 && (
              <div className="flex justify-center items-center my-12">
                <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mr-4"></div>
                <span className="text-lg text-gray-300">Loading more...</span>
              </div>
            )}

            {/* End of results */}
            {!hasMore && (
              <div className="flex flex-col items-center justify-center my-12 py-8 border-t border-gray-700">
                <div className="text-4xl mb-4 text-gray-400">🎉</div>
                <p className="text-xl text-gray-400">You've reached the end!</p>
                <p className="text-gray-500 mt-2">No more anime to load</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Browse;
