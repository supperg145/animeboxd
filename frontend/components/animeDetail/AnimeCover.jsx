import Image from 'next/image';

export const AnimeCover = ({ anime }) => {
  return (
    <div className="w-full lg:w-1/3 relative">
      <Image
        src={
          anime.coverImage?.extraLarge ||
          anime.coverImage?.large ||
          "/placeholder-anime.jpg"
        }
        alt={`${anime.title.english || anime.title.romaji} cover`}
        width={400}
        height={600}
        className="w-full h-full object-cover"
        priority
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-yellow-400 text-xl font-bold mr-1">
              {anime.averageScore || "??"}
            </span>
            <span className="text-white/80">/100</span>
          </div>
          <span className="text-white/90 bg-purple-600 px-2 py-1 rounded text-sm">
            {anime.status || "Unknown"}
          </span>
        </div>
      </div>
    </div>
  );
};