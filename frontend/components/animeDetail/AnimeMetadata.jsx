export const formatDate = (date) => {
    if (!date?.year) return "Unknown";
    return `${date.year}-${date.month?.toString().padStart(2, "0") || "??"}-${
      date.day?.toString().padStart(2, "0") || "??"
    }`;
  };
  
  export const AnimeMetadata = ({ anime }) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <h4 className="text-sm text-purple-300 uppercase tracking-wider mb-1">
            Episodes
          </h4>
          <p className="text-white">{anime.episodes || "Unknown"}</p>
        </div>
        <div>
          <h4 className="text-sm text-purple-300 uppercase tracking-wider mb-1">
            Start Date
          </h4>
          <p className="text-white">{formatDate(anime.startDate)}</p>
        </div>
        <div>
          <h4 className="text-sm text-purple-300 uppercase tracking-wider mb-1">
            End Date
          </h4>
          <p className="text-white">{formatDate(anime.endDate)}</p>
        </div>
        <div>
          <h4 className="text-sm text-purple-300 uppercase tracking-wider mb-1">
            Duration
          </h4>
          <p className="text-white">
            {anime.duration ? `${anime.duration} mins` : "Unknown"}
          </p>
        </div>
      </div>
    );
  };