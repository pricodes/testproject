import CategoryForm from "@/components/admin/CategoryForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewCategoryPage() {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/categories" className="text-gray-500 hover:text-black">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold">New Category</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <CategoryForm />
      </div>
    </div>
  );
}
