import { useRouter } from "next/router";
import Head from "next/head";
import { FiArrowLeft, FiHeart } from "react-icons/fi";

import { useAnimeData } from "../../components/hooks/useAnimeData";
import { useWatchlist } from "../../components/hooks/useWatchlist";
import { AnimeHeader } from "../../components/animeDetail/AnimeHeader";
import { AnimeCover } from "../../components/animeDetail/AnimeCover";
import { AnimeMetadata } from "../../components/animeDetail/AnimeMetadata";
import { AnimeGenres } from "../../components/animeDetail/AnimeGenres";
import { AnimeStudios } from "../../components/animeDetail/AnimeStudios";
import { AnimeLinks } from "../../components/animeDetail/AnimeLinks";
import { LoadingState } from "../../components/animeDetail/LoadingState";
import { ErrorState } from "../../components/animeDetail/ErrorState";
import { NotFoundState } from "../../components/animeDetail/NotFoundState";

import { useAuth } from "../../contexts/AuthContext"; // Import the useAuth hook

const AnimeDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { anime, loading, error, retry, retryCount } = useAnimeData(id);
  const { inWatchlist, isUpdatingWatchlist, toggleWatchlist } = useWatchlist(anime, id);
  const { isLoggedIn } = useAuth(); // Get auth state from context

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} retry={retry} retryCount={retryCount} router={router} />;
  if (!anime) return <NotFoundState />;

  return (
    <>
      <Head>
        <title>
          {anime.title.english || anime.title.romaji} | AnimeTracker
        </title>
        <meta
          name="description"
          content={anime.description?.substring(0, 160) || "Anime details"}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 pb-12">
        {/* Back Button */}
        <div className="container mx-auto px-4 pt-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-purple-200 hover:text-white transition"
            aria-label="Go back to previous page"
          >
            <FiArrowLeft className="mr-2" /> Back to Browse
          </button>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 pt-6 max-w-6xl relative">
          {/* Watchlist Button */}
          {isLoggedIn && (
            <div className="absolute top-0 left-4 z-10 p-3 rounded-full shadow-md transition-all">
              <button
                onClick={toggleWatchlist}
                disabled={isUpdatingWatchlist}
                className={`bg-white/90 text-gray-800 hover:bg-white p-3 rounded-full shadow-md ${
                  isUpdatingWatchlist ? "opacity-70 cursor-not-allowed" : ""
                }`}
                aria-label={
                  inWatchlist ? "Remove from watchlist" : "Add to watchlist"
                }
              >
                <FiHeart
                  className={`text-lg ${inWatchlist ? "fill-current" : ""} ${
                    isUpdatingWatchlist ? "animate-pulse" : ""
                  }`}
                />
              </button>
            </div>
          )}

          <AnimeHeader anime={anime} router={router} />

          {/* Content Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-white/20">
            <div className="flex flex-col lg:flex-row">
              <AnimeCover anime={anime} />
              
              {/* Details Column */}
              <div className="w-full lg:w-2/3 p-6">
                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Synopsis
                  </h3>
                  <p className="text-purple-100">
                    {anime.description?.replace(/<[^>]*>?/gm, "") ||
                      "No description available."}
                  </p>
                </div>

                <AnimeMetadata anime={anime} />
                <AnimeGenres anime={anime} />
                <AnimeStudios anime={anime} />
                <AnimeLinks anime={anime} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimeDetail;