import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Our Story</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Luxury Living was born from a passion for exceptional design and craftsmanship.
          We believe that furniture should not only be functional but also a work of art
          that transforms your living space into a sanctuary of style and comfort.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden">
             {/* Placeholder for About Image */}
            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                Showroom Image
            </div>
        </div>
        <div>
          <h2 className="text-3xl font-serif font-bold mb-6">Craftsmanship & Quality</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Every piece in our collection is hand-selected for its quality, durability, and
            aesthetic appeal. We work with renowned artisans and manufacturers who share our
            commitment to excellence. From the finest leathers to sustainable woods,
            our materials are chosen to stand the test of time.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our showroom in Pune is designed to inspire. We invite you to visit us and
            experience the luxury and comfort of our furniture firsthand. Our dedicated team
            is here to guide you through our collection and help you find the perfect pieces
            for your home.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 p-12 rounded-lg text-center">
        <h2 className="text-3xl font-serif font-bold mb-8">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                <h3 className="text-xl font-bold mb-3">Integrity</h3>
                <p className="text-gray-600">We believe in honest pricing and transparent business practices.</p>
            </div>
            <div>
                <h3 className="text-xl font-bold mb-3">Design</h3>
                <p className="text-gray-600">We are passionate about modern, timeless design that elevates everyday living.</p>
            </div>
            <div>
                <h3 className="text-xl font-bold mb-3">Service</h3>
                <p className="text-gray-600">Customer satisfaction is at the heart of everything we do.</p>
            </div>
        </div>
      </div>
    </div>
  );
}
