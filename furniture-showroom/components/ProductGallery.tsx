"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductImage } from "@prisma/client";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(
    images.find((i) => i.isPrimary) || images[0]
  );

  if (!selectedImage) {
      return (
          <div className="aspect-square bg-gray-100 flex items-center justify-center text-gray-400">
              No Image
          </div>
      )
  }

  return (
    <div className="space-y-4">
      <div className="aspect-[4/5] relative bg-gray-100 overflow-hidden rounded-sm">
        <Image
          src={selectedImage.url}
          alt={productName}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className={cn(
              "relative w-20 h-20 flex-shrink-0 border-2 rounded-sm overflow-hidden",
              selectedImage.id === image.id ? "border-black" : "border-transparent"
            )}
          >
            <Image
              src={image.url}
              alt={productName}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
