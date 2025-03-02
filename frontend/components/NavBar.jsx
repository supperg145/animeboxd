import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/status", {
          withCredentials: true,
        });
        setIsLoggedIn(res.data.authenticated);
      } catch (error) {
        setIsLoggedIn(false);
      }
    }

    checkAuth();
  }, [router.pathname]);

  const handleLogout = async () => {
    await axios.post(
      "http://localhost:5000/api/users/logout",
      {},
      { withCredentials: true }
    );
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <nav className="bg-gradient-to-r from-purple-700 to-indigo-700 p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-white text-3xl font-bold flex items-center space-x-2"
        >
          <span className="bg-white text-purple-700 px-3 py-1 rounded-lg shadow-lg">
            AT
          </span>
          <span className="hover:text-gray-300 transition">AnimeTracker</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-white hover:text-gray-300 transition">
            Home
          </Link>
          <Link
            href="/browse"
            className="text-white hover:text-gray-300 transition"
          >
            Browse
          </Link>
          <Link
            href="/about"
            className="text-white hover:text-gray-300 transition"
          >
            About
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                href="/anime-list"
                className="text-white hover:text-gray-300 transition"
              >
                Anime List
              </Link>
              <Link
                href="/social"
                className="text-white hover:text-gray-300 transition"
              >
                Social
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-white hover:text-gray-300 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Button (Mobile) */}
        <button
          className="md:hidden text-white focus:outline-none text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-purple-800 text-white flex flex-col space-y-3 p-4 shadow-lg">
          <Link href="/" className="hover:text-gray-300 transition">
            Home
          </Link>
          <Link href="/browse" className="hover:text-gray-300 transition">
            Browse
          </Link>
          <Link href="/about" className="hover:text-gray-300 transition">
            About
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                href="/anime-list"
                className="hover:text-gray-300 transition"
              >
                Anime List
              </Link>
              <Link href="/social" className="hover:text-gray-300 transition">
                Social
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-300 transition">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
