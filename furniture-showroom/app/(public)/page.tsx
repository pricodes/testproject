import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";

export default async function HomePage() {
  const [categories, featuredProducts] = await Promise.all([
    prisma.category.findMany({ take: 3 }),
    prisma.product.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
      include: { images: true, category: true }
    })
  ]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
        {/* Background Image Placeholder - In a real app, use a real image */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 z-0">
             {/* Use a placeholder from Unsplash or similar if we could, but for now just a dark bg or a pattern */}
             <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />
        </div>

        <div className="relative z-20 text-center container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 tracking-tight">
            Elevate Your Living Space
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Discover our curated collection of premium furniture designed for comfort, style, and luxury.
          </p>
          <Link href="/collections">
             <Button variant="secondary" className="text-lg px-8 py-4">
              Shop Collection
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold mb-4">Our Collections</h2>
            <p className="text-gray-600">Explore furniture for every room in your home.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link key={category.id} href={`/collections/${category.slug}`} className="group block relative h-96 overflow-hidden">
                {/* Category Image Placeholder */}
                <div className="absolute inset-0 bg-gray-200">
                    {category.image ? (
                        <Image src={category.image} alt={category.name} fill className="object-cover group-hover:scale-105 transition duration-700" />
                    ) : (
                         <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                            No Image
                         </div>
                    )}
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-3xl font-serif font-bold">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-2">New Arrivals</h2>
              <p className="text-gray-600">The latest additions to our showroom.</p>
            </div>
            <Link href="/collections" className="hidden md:block text-sm font-medium border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition">
              View All Products
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link href="/collections">
                <Button variant="outline">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                <div>
                    <h3 className="text-xl font-bold mb-4">Premium Quality</h3>
                    <p className="text-gray-600">Crafted with the finest materials to ensure durability and elegance.</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">Modern Design</h3>
                    <p className="text-gray-600">Contemporary styles that fit perfectly into the modern home.</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">Expert Support</h3>
                    <p className="text-gray-600">Our team is here to help you find the perfect piece for your space.</p>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
