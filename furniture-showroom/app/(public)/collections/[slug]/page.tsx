import { prisma } from "@/lib/db";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) {
    notFound();
  }

  const [categories, products] = await Promise.all([
    prisma.category.findMany(),
    prisma.product.findMany({
        where: { categoryId: category.id },
        orderBy: { createdAt: "desc" },
        include: { images: true, category: true }
    })
  ]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif font-bold mb-4">{category.name}</h1>
      <p className="text-gray-600 mb-8 max-w-2xl">{category.description}</p>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-4 mb-12">
        <Link href="/collections" className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:border-black hover:text-black transition text-sm font-medium">
            All
        </Link>
        {categories.map(c => (
             <Link key={c.id} href={`/collections/${c.slug}`}
             className={`px-4 py-2 rounded-full border text-sm font-medium transition ${c.slug === slug ? 'border-black bg-black text-white' : 'border-gray-300 text-gray-700 hover:border-black hover:text-black'}`}>
                {c.name}
            </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}
        {products.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-500">
                No products found in this category.
            </div>
        )}
      </div>
    </div>
  );
}
