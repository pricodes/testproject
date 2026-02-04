import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import ProductActions from "@/components/ProductActions";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { images: true, category: true }
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Left: Gallery */}
        <div>
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Right: Details */}
        <div>
          <p className="text-gray-500 mb-2">{product.category.name}</p>
          <h1 className="text-4xl font-serif font-bold mb-4">{product.name}</h1>

          {product.price && (
            <p className="text-2xl font-medium text-gray-900 mb-6">
              ${product.price.toString()}
            </p>
          )}

          <div className="prose prose-gray mb-8">
            <p className="text-gray-600 leading-relaxed">
              {product.description || "No description available."}
            </p>
          </div>

          <div className="space-y-4 border-t border-b border-gray-200 py-6 mb-8">
            {product.dimensions && (
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">Dimensions</span>
                <span className="text-gray-600">{product.dimensions}</span>
              </div>
            )}
            {product.material && (
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">Material</span>
                <span className="text-gray-600">{product.material}</span>
              </div>
            )}
            {product.sku && (
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">SKU</span>
                <span className="text-gray-600">{product.sku}</span>
              </div>
            )}
          </div>

          <ProductActions productName={product.name} productId={product.id} />
        </div>
      </div>
    </div>
  );
}
