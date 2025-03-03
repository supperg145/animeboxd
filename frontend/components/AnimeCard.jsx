import { useState } from "react";
import Link from "next/link"; // Import Link from next/link
import Image from "next/image"; // Import Image from next/image
import axios from "axios";

const AnimeCard = ({ anime }) => {
  const [expanded, setExpanded] = useState(false);

  const sanitizeDescription = (desc) => {
    return desc
      ? desc.replace(/<br\s*\/?>/g, "\n")
      : "No description available.";
  };

  const handleAddToWatchlist = (id) => {
    axios
      .post(
        "http://localhost:5000/api/users/watchlist/add",
        { anilistId: id },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Add to Watchlist Success:", response.data);
      })
      .catch((err) => {
        console.error("Add to Watchlist Error:", err);
      });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-6 transition-transform transform hover:scale-105 hover:shadow-xl">
      {/* Anime Cover Image */}
      <Link href={`/anime/${anime.id}`} passHref>
        <div className="relative w-full h-64 overflow-hidden rounded-md group cursor-pointer">
          <Image
            src={anime.coverImage?.large || "/placeholder-image.jpg"} // Fallback image
            alt={anime.title.english || "No Title"}
            layout="fill" // Use layout="fill" for responsive images
            objectFit="cover" // Ensure the image covers the container
            className="transition-transform duration-300 group-hover:scale-110"
            key={anime.id} // Add a key for better React rendering
          />
        </div>
      </Link>

      {/* Anime Title */}
      <h3 className="text-lg font-semibold mt-3">
        {anime.title.english || "Unknown Title"}
      </h3>
      <h4 className="text-gray-500">{anime.title.romaji}</h4>
      <h4 className="text-gray-400">{anime.title.native}</h4>
      <p className="text-sm text-gray-700">Status: {anime.status}</p>
      <p className="text-sm text-gray-700">
        Episodes: {anime.episodes || "Unknown"}
      </p>

      {/* Description with Read More Toggle */}
      <p className="text-gray-600 text-sm whitespace-pre-line mt-2">
        {expanded
          ? sanitizeDescription(anime.description)
          : sanitizeDescription(anime.description)?.slice(0, 150) + "..."}
      </p>
      {anime.description && anime.description.length > 150 && (
        <button
          className="text-blue-500 hover:text-blue-700 text-sm mt-2"
          onClick={() => setExpanded(!expanded)}
          aria-label={expanded ? "Read Less" : "Read More"}
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}

      {/* Add to Watchlist Button */}
      <div className="mt-4">
        <button
          className="text-green-500 hover:text-green-700"
          onClick={() => handleAddToWatchlist(anime.id)} // Wrap in arrow function
          aria-label="Add to Watchlist"
        >
          + Add to Watchlist
        </button>
      </div>
    </div>
  );
};

export default AnimeCard;
