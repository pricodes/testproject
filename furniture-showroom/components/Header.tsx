import Link from "next/link";
import { Search, ShoppingBag, Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-serif font-bold tracking-tight">
          Luxury Living
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium hover:text-gray-600 transition">
            Home
          </Link>
          <Link href="/collections" className="text-sm font-medium hover:text-gray-600 transition">
            Collections
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-gray-600 transition">
            Our Story
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-gray-600 transition">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition">
            <Search size={20} />
          </button>
           {/* Mobile Menu Trigger (Visual only for now) */}
           <button className="md:hidden p-2 hover:bg-gray-100 rounded-full transition">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
