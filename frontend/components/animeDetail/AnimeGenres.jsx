export const AnimeGenres = ({ anime }) => {
    if (!anime.genres?.length) return null;
  
    return (
      <div className="mb-6">
        <h4 className="text-sm text-purple-300 uppercase tracking-wider mb-2">
          Genres
        </h4>
        <div className="flex flex-wrap gap-2">
          {anime.genres.map((genre) => (
            <span
              key={genre}
              className="px-3 py-1 bg-purple-600/30 text-purple-100 rounded-full text-sm"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    );
  };