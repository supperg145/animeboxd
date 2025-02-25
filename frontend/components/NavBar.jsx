import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-purple-600 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          AnimeTracker
        </Link>
        <div className="space-x-4">
          <Link href="/" className="text-white hover:text-purple-300">
            Home
          </Link>
          <Link href="/browse" className="text-white hover:text-purple-300">
            Browse
          </Link>
        </div>
      </div>
    </nav>
  );
}
