"use client";

import { useActionState } from "react";
import { submitEnquiry } from "@/app/actions/enquiry";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  const [state, action, isPending] = useActionState(submitEnquiry, null);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-serif font-bold text-center mb-16">Contact Us</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Visit Our Showroom</h2>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="bg-gray-100 p-3 rounded-full h-fit">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Address</h3>
                <p className="text-gray-600 leading-relaxed">
                  Shop 1 & 2, Sukhwani Udyaan,<br />
                  PCMC Link Road, Chinchwad,<br />
                  Pune 411033
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-gray-100 p-3 rounded-full h-fit">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Phone</h3>
                <p className="text-gray-600">+91 98765 43210</p>
                <p className="text-gray-600">+91 98765 43211</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-gray-100 p-3 rounded-full h-fit">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Email</h3>
                <p className="text-gray-600">info@luxuryliving.com</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-gray-100 p-3 rounded-full h-fit">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Opening Hours</h3>
                <p className="text-gray-600">Mon - Sun: 10:00 AM - 9:00 PM</p>
              </div>
            </div>
          </div>

          {/* Map Embed Placeholder */}
          <div className="mt-12 h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
            Google Map Embed
          </div>
        </div>

        {/* Enquiry Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

          {state?.success ? (
             <div className="bg-green-50 text-green-800 p-6 rounded text-center">
              <h3 className="text-xl font-bold mb-2">Thank You!</h3>
              <p>{state.message}</p>
            </div>
          ) : (
            <form action={action} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                    type="text"
                    name="name"
                    required
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black/50"
                    placeholder="Your Name"
                    />
                    {state?.error?.name && <p className="text-red-500 text-sm mt-1">{state.error.name}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                        <input
                        type="tel"
                        name="phone"
                        required
                        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black/50"
                        placeholder="Your Phone"
                        />
                        {state?.error?.phone && <p className="text-red-500 text-sm mt-1">{state.error.phone}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                        type="email"
                        name="email"
                        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black/50"
                        placeholder="Your Email"
                        />
                         {state?.error?.email && <p className="text-red-500 text-sm mt-1">{state.error.email}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                    name="message"
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black/50 h-32"
                    placeholder="How can we help you?"
                    />
                </div>

                {state?.message && !state.success && (
                    <p className="text-red-500 text-sm">{state.message}</p>
                )}

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-black text-white p-4 rounded hover:bg-gray-800 disabled:opacity-50 transition font-medium"
                >
                    {isPending ? "Sending Message..." : "Send Message"}
                </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
