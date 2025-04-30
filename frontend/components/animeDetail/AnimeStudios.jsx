export const AnimeStudios = ({ anime }) => {
    if (!anime.studios?.edges?.length) return null;
  
    return (
      <div className="mb-6">
        <h4 className="text-sm text-purple-300 uppercase tracking-wider mb-2">
          Studios
        </h4>
        <div className="flex flex-wrap gap-2">
          {anime.studios.edges.map(({ node }) => (
            <span
              key={node.id}
              className="px-3 py-1 bg-indigo-600/30 text-indigo-100 rounded-full text-sm"
            >
              {node.name}
            </span>
          ))}
        </div>
      </div>
    );
  };