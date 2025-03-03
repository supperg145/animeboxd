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
  const [initialLoading, setInitialLoading] = useState(true); // Separate state for initial load
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch anime data
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
      console.log("Popular anime data:", data);

      // If no data is returned, there are no more animes to fetch
      if (data.length === 0) {
        setHasMore(false);
      } else {
        // Append new data to the existing list
        setAnimeList((prevList) => [...prevList, ...data]);
      }
    } catch (error) {
      console.error("Error fetching anime:", error);
      setError(error);
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

      // Check if the user has scrolled to the bottom
      if (
        scrollTop + clientHeight >= scrollHeight - 100 &&
        !loading &&
        hasMore
      ) {
        setLoading(true);
        setPage((prevPage) => prevPage + 1); // Increment page
      }
    }, 200); // Debounce delay of 200ms

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div className="p-4 sm:p-8 bg-gradient-to-b from-purple-900 to-indigo-900 min-h-screen">
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
        Popular Animes (Infinite Scroll)
      </h1>
      {initialLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-300">Loading...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-red-400">Error: {error.message}</p>
          <button
            className="ml-4 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            onClick={() => {
              setError(null);
              setLoading(true);
              fetchAnime(page);
            }}
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {animeList.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      )}
      {loading && page > 1 && (
        <div className="flex justify-center items-center mt-8">
          <p className="text-xl text-gray-300">Loading more animes...</p>
        </div>
      )}
      {!hasMore && (
        <div className="flex justify-center items-center mt-8">
          <p className="text-xl text-gray-300">No more animes to load.</p>
        </div>
      )}
    </div>
  );
};

export default Browse;
