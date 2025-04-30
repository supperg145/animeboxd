import Link from 'next/link';

export const NotFoundState = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
      <div className="text-center max-w-md p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Not Found</h2>
        <p className="text-gray-300 mb-6">
          The requested anime could not be found.
        </p>
        <Link
          href="/"
          className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Browse Anime
        </Link>
      </div>
    </div>
  );
};