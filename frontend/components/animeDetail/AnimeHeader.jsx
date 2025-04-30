import Link from 'next/link';

export const AnimeHeader = ({ anime, router }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
        {anime.title.english || anime.title.romaji}
      </h1>
      {anime.title.romaji !== anime.title.english && (
        <h2 className="text-xl text-purple-200">{anime.title.romaji}</h2>
      )}
      {anime.title.native && (
        <h3 className="text-lg text-purple-100">{anime.title.native}</h3>
      )}
    </div>
  );
};