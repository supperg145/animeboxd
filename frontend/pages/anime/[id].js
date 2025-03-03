import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

const AnimeDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Get anime ID from the URL
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return; // Wait until the ID is available

    const fetchAnimeDetails = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/anime/searchbyid/${id}`
        );
        if (!res.ok) {
          throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }
        const data = await res.json();
        setAnime(data);
      } catch (error) {
        console.error("Error fetching anime details:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
        <div className="text-center text-2xl text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-red-500 to-pink-600">
        <div className="text-center text-2xl text-white">
          Error: {error.message}
        </div>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-700 to-gray-900">
        <div className="text-center text-2xl text-white">Anime not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-6">
          {anime.title.english}
        </h1>

        {/* Content Container */}
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Cover Image (Mobile: Full Width, Desktop: 1/3 Width) */}
            <div className="w-full md:w-1/3 relative">
              <Image
                src={anime.coverImage?.large || "/placeholder-image.jpg"}
                alt={anime.title.english}
                width={400}
                height={600}
                objectFit="cover"
                className="rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
              />
            </div>

            {/* Anime Details (Mobile: Full Width, Desktop: 2/3 Width) */}
            <div className="w-full md:w-2/3 p-4 sm:p-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                {anime.title.romaji}
              </h2>
              <h3 className="text-lg sm:text-xl text-gray-600">
                {anime.title.native}
              </h3>
              <p className="text-gray-700 mt-4 text-base sm:text-lg">
                {anime.description}
              </p>

              {/* Additional Details */}
              <div className="mt-6 space-y-3">
                <p className="text-gray-700">
                  <span className="font-semibold">Status:</span> {anime.status}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Episodes:</span>{" "}
                  {anime.episodes || "Unknown"}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Genres:</span>{" "}
                  {anime.genres?.join(", ")}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Average Score:</span>{" "}
                  {anime.averageScore}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Start Date:</span>{" "}
                  {anime.startDate?.year}-{anime.startDate?.month}-
                  {anime.startDate?.day}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">End Date:</span>{" "}
                  {anime.endDate?.year}-{anime.endDate?.month}-
                  {anime.endDate?.day}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Studios:</span>{" "}
                  {anime.studios?.edges
                    ?.map((studio) => studio.node.name)
                    .join(", ")}
                </p>
              </div>

              {/* Trailer (Mobile: Full Width, Desktop: Responsive) */}
              {anime.trailer && (
                <div className="mt-6">
                  <h4 className="text-xl sm:text-2xl font-semibold text-gray-800">
                    Trailer
                  </h4>
                  <a
                    href={`https://www.youtube.com/watch?v=${anime.trailer.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={anime.trailer.thumbnail}
                      alt="Trailer Thumbnail"
                      width={480}
                      height={270}
                      className="rounded-md mt-2 w-full"
                    />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail;
