import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="relative bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-stone-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-stone-50 transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main className="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-light text-gray-900 sm:text-5xl md:text-6xl font-serif">
                <span className="block xl:inline">Curated design for</span>{' '}
                <span className="block text-stone-600 xl:inline">modern living</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 font-light">
                Discover a collection where aesthetic meets function. We connect you with bespoke furniture pieces tailored to your unique style and space.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-none shadow-sm">
                  <Link
                    href="#contact"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium text-white bg-stone-900 hover:bg-stone-800 md:py-4 md:text-lg transition-all duration-300"
                  >
                    Request Consultation
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    href="#gallery"
                    className="w-full flex items-center justify-center px-8 py-3 border border-stone-300 text-base font-medium text-stone-700 bg-transparent hover:bg-stone-50 md:py-4 md:text-lg transition-all duration-300"
                  >
                    View Showroom
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=2000&auto=format&fit=crop"
          alt="Minimalist living room"
        />
      </div>
    </div>
  );
};

export default Hero;
