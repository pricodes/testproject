import { prisma } from "@/lib/db";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { deleteCategory } from "@/app/actions/categories";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { products: true } } }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Link href="/admin/categories/new" className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-800">
          <Plus size={20} />
          Add Category
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-900">Name</th>
              <th className="px-6 py-4 font-medium text-gray-900">Slug</th>
              <th className="px-6 py-4 font-medium text-gray-900">Products</th>
              <th className="px-6 py-4 font-medium text-gray-900 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{category.name}</td>
                <td className="px-6 py-4 text-gray-500">{category.slug}</td>
                <td className="px-6 py-4">{category._count.products}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/categories/${category.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                      <Edit size={18} />
                    </Link>
                    <form action={async () => {
                        "use server";
                        await deleteCategory(category.id);
                    }}>
                        <button type="submit" className="p-2 text-red-600 hover:bg-red-50 rounded">
                            <Trash2 size={18} />
                        </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
                <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No categories found.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
