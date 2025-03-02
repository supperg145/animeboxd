import { useState } from "react";

const AnimeCard = ({ anime }) => {
  const [expanded, setExpanded] = useState(false);

  const sanitizeDescription = (desc) => {
    return desc
      ? desc.replace(/<br\s*\/?>/g, "\n")
      : "No description available.";
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-6 transition-transform transform hover:scale-105 hover:shadow-xl">
      {/* Anime Cover Image */}
      <div className="relative w-full h-64 overflow-hidden rounded-md group">
        <img
          src={anime.coverImage?.large || "/placeholder-image.jpg"} // Fallback image
          alt={anime.title.english || "No Title"}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

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
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default AnimeCard;
