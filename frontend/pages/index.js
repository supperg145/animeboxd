
export default function Home() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">


      {/* Hero Section */}
      <main className="container mx-auto p-4">
        <section className="text-center py-20">
          <h1 className="text-4xl font-bold text-purple-600 dark:text-purple-400">
            Welcome to AnimeTracker
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Track and organize your favorite anime in one place.
          </p>
          <div className="mt-6">
            <input
              type="text"
              placeholder="Search anime..."
              className="px-4 py-2 w-64 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="ml-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Search
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
