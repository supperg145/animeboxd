import { useState, useEffect } from 'react';

export const useAnimeData = (id) => {
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!id) return;

    const fetchAnimeDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:5000/api/anime/searchbyid/${id}`
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch anime details (${res.status})`);
        }
        const data = await res.json();
        setAnime(data);
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "An error occurred");
        setRetryCount((prev) => prev + 1);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchAnimeDetails, retryCount * 1000);
    return () => clearTimeout(timer);
  }, [id, retryCount]);

  const retry = () => setRetryCount(retryCount + 1);

  return { anime, loading, error, retry, retryCount };
};