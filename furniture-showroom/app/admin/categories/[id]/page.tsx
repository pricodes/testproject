import CategoryForm from "@/components/admin/CategoryForm";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    notFound();
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/categories" className="text-gray-500 hover:text-black">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold">Edit Category</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <CategoryForm category={category} />
      </div>
    </div>
  );
}
