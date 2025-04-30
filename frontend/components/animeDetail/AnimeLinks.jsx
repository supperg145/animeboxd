import { FiExternalLink } from 'react-icons/fi';

export const AnimeLinks = ({ anime }) => {
  return (
    <div className="space-y-4">
      {/* Trailer */}
      {anime.trailer?.id && (
        <div>
          <h4 className="text-sm text-purple-300 uppercase tracking-wider mb-2">
            Trailer
          </h4>
          <a
            href={`https://www.youtube.com/watch?v=${anime.trailer.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-white hover:text-purple-200 transition"
            aria-label="Watch trailer on YouTube"
          >
            Watch on YouTube <FiExternalLink className="ml-1" />
          </a>
        </div>
      )}

      {/* External Links */}
      {anime.externalLinks?.length > 0 && (
        <div>
          <h4 className="text-sm text-purple-300 uppercase tracking-wider mb-2">
            More Info
          </h4>
          <div className="flex flex-wrap gap-3">
            {anime.externalLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-white hover:text-purple-200 transition text-sm"
                aria-label={`View on ${link.site}`}
              >
                {link.site} <FiExternalLink className="ml-1" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};