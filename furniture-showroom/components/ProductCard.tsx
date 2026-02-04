import Link from "next/link";
import Image from "next/image";
import { Product, ProductImage, Category } from "@prisma/client";

interface ProductCardProps {
  product: Product & { images: ProductImage[], category: Category };
}

export default function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images.find(i => i.isPrimary) || product.images[0];
  const imageUrl = primaryImage ? primaryImage.url : "/placeholder.jpg"; // Handle placeholder

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-4">
        {primaryImage ? (
            <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition duration-500"
            />
        ) : (
            <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
        )}
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-1">{product.category.name}</p>
        <h3 className="font-medium text-lg mb-1">{product.name}</h3>
        {product.price && (
             <p className="text-gray-900 font-semibold">${product.price.toString()}</p>
        )}
      </div>
    </Link>
  );
}
