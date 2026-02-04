import { prisma } from "@/lib/db";
import { Package, Tag, MessageSquare } from "lucide-react";

async function getStats() {
  const [productCount, categoryCount, enquiryCount] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.enquiry.count({ where: { status: "new" } }),
  ]);
  return { productCount, categoryCount, enquiryCount };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-full text-blue-600">
            <Package size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Products</p>
            <p className="text-2xl font-bold">{stats.productCount}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-full text-purple-600">
            <Tag size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Categories</p>
            <p className="text-2xl font-bold">{stats.categoryCount}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
            <MessageSquare size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">New Enquiries</p>
            <p className="text-2xl font-bold">{stats.enquiryCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
