import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const useWatchlist = (anime, id) => {
  const [isUpdatingWatchlist, setIsUpdatingWatchlist] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    const checkWatchlistStatus = async () => {
      if (!anime) return;

      try {
        const response = await fetch(
          "http://localhost:5000/api/users/watchlist",
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const isInWatchlist = data.watchlist.some(
            (item) => item.id === parseInt(id)
          );
          setInWatchlist(isInWatchlist);
        }
      } catch (error) {
        console.error("Error checking watchlist status:", error);
      }
    };

    checkWatchlistStatus();
  }, [anime, id]);

  const toggleWatchlist = async () => {
    if (!anime || isUpdatingWatchlist) return;

    setIsUpdatingWatchlist(true);
    try {
      const endpoint = inWatchlist ? "/watchlist/remove" : "/watchlist/add";
      const method = inWatchlist ? "DELETE" : "POST";

      const response = await fetch(
        `http://localhost:5000/api/users${endpoint}`,
        {
          method,
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            anilistId: anime.id,
          }),
        }
      );

      if (response.ok) {
        const updatedStatus = !inWatchlist;
        setInWatchlist(updatedStatus);

        toast.success(
          updatedStatus
            ? "Added to your watchlist"
            : "Removed from your watchlist",
          {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update watchlist");
      }
    } catch (error) {
      console.error("Error updating watchlist:", error);
      toast.error(error.message || "Failed to update watchlist", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsUpdatingWatchlist(false);
    }
  };

  return { inWatchlist, isUpdatingWatchlist, toggleWatchlist };
};