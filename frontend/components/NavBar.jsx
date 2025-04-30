import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext"; // Import the useAuth hook

export default function Navbar() {
  const { isLoggedIn, loading } = useAuth(); // Get auth state from context
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/logout",
        {},
        { withCredentials: true }
      );
      // Note: The AuthProvider will automatically update isLoggedIn
      // when the route changes after logout
      setMenuOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  // Show loading state if auth status is still being checked
  if (loading) {
    return (
      <nav className="fixed w-full top-0 z-50 bg-gradient-to-r from-purple-700 to-indigo-700 shadow-md">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <div className="text-white text-2xl sm:text-3xl font-bold flex items-center space-x-2">
              <span className="bg-white text-purple-700 px-2 py-1 sm:px-3 sm:py-1 rounded-lg shadow-lg">
                AT
              </span>
              <span>AnimeTracker</span>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gradient-to-r from-purple-800 to-indigo-800 shadow-xl"
          : "bg-gradient-to-r from-purple-700 to-indigo-700 shadow-md"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-white text-2xl sm:text-3xl font-bold flex items-center space-x-2 hover:opacity-90 transition-opacity"
            onClick={closeMenu}
          >
            <span className="bg-white text-purple-700 px-2 py-1 sm:px-3 sm:py-1 rounded-lg shadow-lg">
              AT
            </span>
            <span>AnimeTracker</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink href="/" onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink href="/browse" onClick={closeMenu}>
              Browse
            </NavLink>
            <NavLink href="/about" onClick={closeMenu}>
              About
            </NavLink>

            {isLoggedIn ? (
              <>
                <NavLink href="/anime-list" onClick={closeMenu}>
                  My List
                </NavLink>
                <NavLink href="/social" onClick={closeMenu}>
                  Social
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-md transition-all hover:shadow-lg active:scale-95"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink href="/login" onClick={closeMenu}>
                  Login
                </NavLink>
                <button
                  onClick={closeMenu}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-md transition-all hover:shadow-lg active:scale-95"
                >
                  <Link href="/register">Register</Link>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none transition-transform active:scale-95"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="bg-purple-800 px-4 py-3 space-y-3 shadow-lg">
          <MobileNavLink href="/" onClick={closeMenu}>
            Home
          </MobileNavLink>
          <MobileNavLink href="/browse" onClick={closeMenu}>
            Browse
          </MobileNavLink>
          <MobileNavLink href="/about" onClick={closeMenu}>
            About
          </MobileNavLink>

          {isLoggedIn ? (
            <>
              <MobileNavLink href="/anime-list" onClick={closeMenu}>
                My List
              </MobileNavLink>
              <MobileNavLink href="/social" onClick={closeMenu}>
                Social
              </MobileNavLink>
              <button
                onClick={handleLogout}
                className="w-full text-left bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <MobileNavLink href="/login" onClick={closeMenu}>
                Login
              </MobileNavLink>
              <MobileNavLink
                href="/register"
                onClick={closeMenu}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md block text-center"
              >
                Register
              </MobileNavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

// Reusable NavLink component for desktop
const NavLink = ({ href, onClick, children }) => (
  <Link
    href={href}
    className="text-white hover:text-gray-300 transition-colors px-3 py-1 rounded-md hover:bg-purple-600/30"
    onClick={onClick}
  >
    {children}
  </Link>
);

// Reusable NavLink component for mobile
const MobileNavLink = ({ href, onClick, children, className = "" }) => (
  <Link
    href={href}
    className={`text-white hover:text-gray-300 transition-colors px-4 py-2 rounded-lg hover:bg-purple-700 block ${className}`}
    onClick={onClick}
  >
    {children}
  </Link>
);
