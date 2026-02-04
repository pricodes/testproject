"use client";

import { useActionState, useEffect } from "react";
import { submitEnquiry } from "@/app/actions/enquiry";
import { X } from "lucide-react";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  productId?: string;
}

export default function EnquiryModal({ isOpen, onClose, productName, productId }: EnquiryModalProps) {
  const [state, action, isPending] = useActionState(submitEnquiry, null);

  useEffect(() => {
    if (state?.success) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black"
        >
          <X size={24} />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-serif font-bold mb-2">Enquire Now</h2>
          <p className="text-gray-600 mb-6">
            Interested in {productName || "our products"}? Fill out the form below and we&apos;ll get back to you.
          </p>

          {state?.success ? (
            <div className="bg-green-50 text-green-800 p-4 rounded text-center">
              {state.message}
            </div>
          ) : (
            <form action={action} className="space-y-4">
              <input type="hidden" name="productId" value={productId || ""} />

              <div>
                <label className="block text-sm font-medium text-gray-700">Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                {state?.error?.name && <p className="text-red-500 text-xs">{state.error.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                 {state?.error?.phone && <p className="text-red-500 text-xs">{state.error.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                 {state?.error?.email && <p className="text-red-500 text-xs">{state.error.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  name="message"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-24"
                  defaultValue={productName ? `I am interested in ${productName}. Please tell me more.` : ""}
                />
              </div>

              {state?.message && !state.success && (
                <p className="text-red-500 text-sm">{state.message}</p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-black text-white p-3 rounded hover:bg-gray-800 disabled:opacity-50 transition"
              >
                {isPending ? "Sending..." : "Submit Enquiry"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
