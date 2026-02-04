import React from 'react';

const items = [
  {
    id: 1,
    title: 'Velvet Armchair',
    category: 'Seating',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Minimalist Sofa',
    category: 'Living Room',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Oak Dining Table',
    category: 'Dining',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Modern Lamp',
    category: 'Lighting',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Abstract Art Piece',
    category: 'Decor',
    image: 'https://images.unsplash.com/photo-1582582621959-48d27397dc69?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Leather Ottoman',
    category: 'Seating',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop',
  },
];

const Gallery = () => {
  return (
    <div id="gallery" className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl tracking-tight font-serif font-light text-gray-900 sm:text-4xl">
            Our Collection
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto font-light">
            Handpicked pieces that define modern luxury.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {items.map((item) => (
            <div key={item.id} className="group relative">
              <div className="aspect-square w-full overflow-hidden rounded-sm bg-gray-200 lg:aspect-auto lg:h-80">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-lg text-gray-700 font-medium">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
