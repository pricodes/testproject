"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone } from "lucide-react";
import EnquiryModal from "@/components/EnquiryModal";

interface ProductActionsProps {
  productName: string;
  productId: string;
}

export default function ProductActions({ productName, productId }: ProductActionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWhatsApp = () => {
    const text = `Hi, I'm interested in the ${productName} I saw on your website.`;
    window.open(`https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = "tel:+91XXXXXXXXXX";
  };

  return (
    <div className="flex flex-col gap-3 mt-8">
      <Button onClick={() => setIsModalOpen(true)} className="w-full text-lg py-6">
        Enquire Now
      </Button>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={handleWhatsApp} className="flex items-center justify-center gap-2">
          <MessageCircle size={20} />
          WhatsApp
        </Button>
        <Button variant="outline" onClick={handleCall} className="flex items-center justify-center gap-2">
          <Phone size={20} />
          Call Us
        </Button>
      </div>

      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={productName}
        productId={productId}
      />
    </div>
  );
}
