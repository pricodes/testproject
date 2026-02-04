import { prisma } from "@/lib/db";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { deleteProduct } from "@/app/actions/products";
import Image from "next/image";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true, images: true }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/admin/products/new" className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-800">
          <Plus size={20} />
          Add Product
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-900">Image</th>
              <th className="px-6 py-4 font-medium text-gray-900">Name</th>
              <th className="px-6 py-4 font-medium text-gray-900">Category</th>
              <th className="px-6 py-4 font-medium text-gray-900">Price</th>
              <th className="px-6 py-4 font-medium text-gray-900 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => {
                const primaryImage = product.images.find(i => i.isPrimary) || product.images[0];
                return (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                        {primaryImage && (
                            <div className="relative w-12 h-12">
                                <Image
                                    src={primaryImage.url}
                                    alt={product.name}
                                    fill
                                    className="object-cover rounded"
                                />
                            </div>
                        )}
                    </td>
                    <td className="px-6 py-4">{product.name}</td>
                    <td className="px-6 py-4">{product.category.name}</td>
                    <td className="px-6 py-4">{product.price ? `$${product.price}` : '-'}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/products/${product.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                          <Edit size={18} />
                        </Link>
                        <form action={async () => {
                            "use server";
                            await deleteProduct(product.id);
                        }}>
                            <button type="submit" className="p-2 text-red-600 hover:bg-red-50 rounded">
                                <Trash2 size={18} />
                            </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                )
            })}
             {products.length === 0 && (
                <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No products found.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
