import axios from "axios";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/anime/searchbytitle`,
        {
          params: {
            title: searchQuery,
          },
        }
      );

      if (response.data) {
        setAnimeList(response.data); // Directly use response.data as your backend sends the media array
      } else {
        setError("No results found.");
      }
    } catch (err) {
      console.error("Error fetching anime data:", err);
      setError("Failed to fetch anime data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <main className="container mx-auto px-4 py-12">
        <section className="text-center">
          <h1 className="text-4xl font-bold text-purple-600 dark:text-purple-400">
            Welcome to AnimeTracker
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Track and organize your favorite anime in one place.
          </p>
          <div className="mt-6 flex justify-center items-center">
            <input
              type="text"
              placeholder="Search anime..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="px-4 py-2 w-full max-w-sm rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              className="ml-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          {loading && (
            <div className="mt-6 flex justify-center">
              <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {error && <p className="mt-4 text-red-500">{error}</p>}

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {animeList.map((anime) => (
              <Link href={`/anime/${anime.id}`} passHref>
                <div
                  key={anime.id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition"
                >
                  {anime.coverImage?.large && (
                    <img
                      src={anime.coverImage.large}
                      alt={anime.title.romaji}
                      className="w-full h-48 object-cover rounded-md mb-3"
                    />
                  )}
                  <h2 className="text-lg font-semibold text-purple-700 dark:text-purple-400">
                    {anime.title.romaji ||
                      anime.title.english ||
                      anime.title.native}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {anime.status} | {anime.episodes} episodes
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                    {anime.description?.replace(/<[^>]*>?/gm, "").slice(0, 100)}
                    ...
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
