import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import {
  FiHeart,
  FiExternalLink,
  FiInfo,
  FiUsers,
  FiStar,
  FiThumbsUp,
  FiFilm,
} from "react-icons/fi";

const AnimeCard = ({ anime }) => {
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const sanitizeDescription = (desc) => {
    if (!desc) return "No description available.";
    return desc.replace(/<br\s*\/?>/g, "\n").replace(/<[^>]*>?/gm, "");
  };

  const description = sanitizeDescription(anime.description);
  const showReadMore = description.length > 150;

  return (
    <div
      className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <Link href={`/anime/${anime.id}`}>
        <div className="relative w-full h-64 sm:h-72 overflow-hidden cursor-pointer group">
          <Image
            src={
              anime.coverImage?.extraLarge ||
              anime.coverImage?.large ||
              "/placeholder-anime.jpg"
            }
            alt={anime.title.english || anime.title.romaji || "Anime cover"}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 group-hover:scale-105"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <div className="text-white">
              <p className="text-sm font-medium">
                {anime.status} • {anime.episodes || "?"} eps • {anime.format}
              </p>
              {anime.averageScore && (
                <div className="flex items-center mt-1">
                  <FiStar className="text-yellow-400 mr-1" />
                  <span className="font-bold">{anime.averageScore}%</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Info Section */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1">
            {anime.title.english || anime.title.romaji}
          </h3>
          {anime.title.romaji !== anime.title.english && (
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1">
              {anime.title.romaji}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">
            {expanded ? description : description.substring(0, 150)}
            {showReadMore && !expanded && "..."}
          </p>
          {showReadMore && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-sm text-purple-600 dark:text-purple-400 hover:underline mt-1"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        {/* Genres */}
        {anime.genres?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {anime.genres.slice(0, 3).map((genre) => (
              <span
                key={genre}
                className="px-2 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 text-xs rounded-full"
              >
                {genre}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons 
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <Link
            href={`/anime/${anime.id}`}
            className="flex items-center justify-center gap-1 p-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors"
          >
            <FiInfo size={14} /> Details
          </Link>
          <Link
            href={`/anime/${anime.id}/characters`}
            className="flex items-center justify-center gap-1 p-2 bg-purple-500 hover:bg-purple-600 text-white text-sm rounded-lg transition-colors"
          >
            <FiUsers size={14} /> Characters
          </Link>
          <Link
            href={`/anime/${anime.id}/episodes`}
            className="flex items-center justify-center gap-1 p-2 bg-teal-500 hover:bg-teal-600 text-white text-sm rounded-lg transition-colors"
          >
            <FiFilm size={14} /> Episodes
          </Link>
          <Link
            href={`/anime/${anime.id}/reviews`}
            className="flex items-center justify-center gap-1 p-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded-lg transition-colors"
          >
            <FiStar size={14} /> Reviews
          </Link>
          <Link
            href={`/anime/${anime.id}/recommendations`}
            className="flex items-center justify-center gap-1 p-2 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-lg transition-colors"
          >
            <FiThumbsUp size={14} /> Recs
          </Link>
          {anime.siteUrl && (
            <a
              href={anime.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 p-2 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
            >
              <FiExternalLink size={14} /> More
            </a>
          )}
        </div>*/}
      </div>
    </div>
  );
};

export default AnimeCard;
