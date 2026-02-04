import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-6">Luxury Living</h3>
            <p className="text-gray-400 leading-relaxed">
              Premium furniture for the modern home.
              Elevate your living space with our curated collection.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-6">Explore</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/collections" className="hover:text-white transition">All Collections</Link></li>
              <li><Link href="/collections/sofas" className="hover:text-white transition">Sofas</Link></li>
              <li><Link href="/collections/dining" className="hover:text-white transition">Dining</Link></li>
              <li><Link href="/collections/bedroom" className="hover:text-white transition">Bedroom</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Visit Us</h4>
            <p className="text-gray-400 mb-4">
              Shop 1 & 2, Sukhwani Udyaan,<br />
              PCMC Link Road, Chinchwad,<br />
              Pune 411033
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Luxury Living. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
