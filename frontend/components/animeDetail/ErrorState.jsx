export const ErrorState = ({ error, retry, retryCount, router }) => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 to-pink-900 flex items-center justify-center">
        <div className="text-center max-w-md p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Error</h2>
          <p className="text-red-100 mb-6">{error}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition"
            >
              Go Back
            </button>
            <button
              onClick={retry}
              className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition"
            >
              Retry ({3 - retryCount} left)
            </button>
          </div>
        </div>
      </div>
    );
  };