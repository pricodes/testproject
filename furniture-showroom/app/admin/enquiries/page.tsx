import { prisma } from "@/lib/db";
import { updateEnquiryStatus } from "@/app/actions/enquiries";

export default async function EnquiriesPage() {
  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
    include: { product: true }
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Enquiries</h1>

      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-900">Date</th>
              <th className="px-6 py-4 font-medium text-gray-900">Name</th>
              <th className="px-6 py-4 font-medium text-gray-900">Contact</th>
              <th className="px-6 py-4 font-medium text-gray-900">Product</th>
              <th className="px-6 py-4 font-medium text-gray-900">Message</th>
              <th className="px-6 py-4 font-medium text-gray-900">Status</th>
              <th className="px-6 py-4 font-medium text-gray-900 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {enquiries.map((enquiry) => (
              <tr key={enquiry.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-500">
                  {enquiry.createdAt.toLocaleDateString()}
                </td>
                <td className="px-6 py-4">{enquiry.name}</td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    {enquiry.email && <div>{enquiry.email}</div>}
                    {enquiry.phone && <div>{enquiry.phone}</div>}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {enquiry.product ? enquiry.product.name : "General"}
                </td>
                <td className="px-6 py-4 max-w-xs truncate" title={enquiry.message || ""}>
                  {enquiry.message}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs ${
                    enquiry.status === 'new' ? 'bg-green-100 text-green-800' :
                    enquiry.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {enquiry.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                        {enquiry.status === 'new' && (
                             <form action={async () => {
                                "use server";
                                await updateEnquiryStatus(enquiry.id, "contacted");
                            }}>
                                <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                                    Mark Contacted
                                </button>
                            </form>
                        )}
                        {enquiry.status !== 'closed' && (
                             <form action={async () => {
                                "use server";
                                await updateEnquiryStatus(enquiry.id, "closed");
                            }}>
                                <button className="text-xs bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600">
                                    Close
                                </button>
                            </form>
                        )}
                    </div>
                </td>
              </tr>
            ))}
             {enquiries.length === 0 && (
                <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">No enquiries found.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
