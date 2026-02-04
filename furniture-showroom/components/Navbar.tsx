import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-serif tracking-widest text-gray-900 uppercase">
              Lusso Living
            </Link>
          </div>
          <div className="hidden md:flex md:space-x-12">
            <Link href="/" className="text-gray-600 hover:text-gray-900 px-1 py-2 text-sm uppercase tracking-wide transition-colors duration-300">
              Home
            </Link>
            <Link href="#gallery" className="text-gray-600 hover:text-gray-900 px-1 py-2 text-sm uppercase tracking-wide transition-colors duration-300">
              Showroom
            </Link>
            <Link href="#contact" className="text-gray-600 hover:text-gray-900 px-1 py-2 text-sm uppercase tracking-wide transition-colors duration-300">
              Design Consultation
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
