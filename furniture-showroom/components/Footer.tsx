import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-stone-900 border-t border-stone-800">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-6">
            <span className="text-stone-400 text-lg font-serif">Lusso Living</span>
        </div>
        <nav className="mt-8 -mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          <div className="px-5 py-2">
            <a href="#" className="text-sm text-stone-400 hover:text-stone-200 transition-colors">
              About
            </a>
          </div>
          <div className="px-5 py-2">
            <a href="#gallery" className="text-sm text-stone-400 hover:text-stone-200 transition-colors">
              Collection
            </a>
          </div>
          <div className="px-5 py-2">
            <a href="#contact" className="text-sm text-stone-400 hover:text-stone-200 transition-colors">
              Design Services
            </a>
          </div>
          <div className="px-5 py-2">
            <a href="#" className="text-sm text-stone-400 hover:text-stone-200 transition-colors">
              Privacy & Terms
            </a>
          </div>
        </nav>
        <p className="mt-8 text-center text-xs text-stone-500">
          &copy; {new Date().getFullYear()} Lusso Living. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
