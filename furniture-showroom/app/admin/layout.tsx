import { LayoutDashboard, Tag, Package, MessageSquare, LogOut } from "lucide-react";
import Link from "next/link";
import { logout } from "@/app/actions/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="text-xl font-bold font-serif">Luxury Living</span>
        </div>
        <nav className="p-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <Tag size={20} />
            <span>Categories</span>
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <Package size={20} />
            <span>Products</span>
          </Link>
          <Link href="/admin/enquiries" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <MessageSquare size={20} />
            <span>Enquiries</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200 mt-auto">
          <form action={logout}>
             <button type="submit" className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-md w-full text-left">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
