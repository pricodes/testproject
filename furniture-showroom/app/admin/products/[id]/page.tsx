import ProductForm from "@/components/admin/ProductForm";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: { images: true }
    }),
    prisma.category.findMany()
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/products" className="text-gray-500 hover:text-black">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold">Edit Product</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <ProductForm product={product} categories={categories} />
      </div>
    </div>
  );
}
