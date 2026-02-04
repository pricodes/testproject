import { prisma } from "@/lib/db";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

export default async function CollectionsPage() {
  const [categories, products] = await Promise.all([
    prisma.category.findMany(),
    prisma.product.findMany({
        orderBy: { createdAt: "desc" },
        include: { images: true, category: true }
    })
  ]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif font-bold mb-8">All Collections</h1>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-4 mb-12">
        <Link href="/collections" className="px-4 py-2 rounded-full border border-black bg-black text-white text-sm font-medium">
            All
        </Link>
        {categories.map(category => (
             <Link key={category.id} href={`/collections/${category.slug}`} className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:border-black hover:text-black transition text-sm font-medium">
                {category.name}
            </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}
        {products.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-500">
                No products found.
            </div>
        )}
      </div>
    </div>
  );
}
