"use client";

import { useActionState } from "react";
import { createProduct, updateProduct } from "@/app/actions/products";
import { Product, Category, ProductImage } from "@prisma/client";
import Image from "next/image";

interface ProductFormProps {
  product?: Product & { images: ProductImage[] };
  categories: Category[];
}

export default function ProductForm({ product, categories }: ProductFormProps) {
  const isEdit = !!product;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [state, action, isPending] = useActionState(async (prevState: any, formData: FormData) => {
    if (isEdit && product) {
        return await updateProduct(product.id, prevState, formData);
    } else {
        return await createProduct(prevState, formData);
    }
  }, null);

  return (
    <form action={action} className="max-w-2xl space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
            type="text"
            name="name"
            defaultValue={product?.name}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {state?.error?.name && <p className="text-red-500 text-sm">{state.error.name}</p>}
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700">Slug</label>
            <input
            type="text"
            name="slug"
            defaultValue={product?.slug}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {state?.error?.slug && <p className="text-red-500 text-sm">{state.error.slug}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
                name="categoryId"
                defaultValue={product?.categoryId}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
            >
                <option value="">Select Category</option>
                {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))}
            </select>
            {state?.error?.categoryId && <p className="text-red-500 text-sm">{state.error.categoryId}</p>}
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700">Price (Optional)</label>
            <input
            type="number"
            step="0.01"
            name="price"
            defaultValue={product?.price ? Number(product.price) : ""}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {state?.error?.price && <p className="text-red-500 text-sm">{state.error.price}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          defaultValue={product?.description || ""}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-24"
        />
        {state?.error?.description && <p className="text-red-500 text-sm">{state.error.description}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div>
            <label className="block text-sm font-medium text-gray-700">Dimensions</label>
            <input
            type="text"
            name="dimensions"
            defaultValue={product?.dimensions || ""}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
        </div>
         <div>
            <label className="block text-sm font-medium text-gray-700">Material</label>
            <input
            type="text"
            name="material"
            defaultValue={product?.material || ""}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">SKU</label>
            <input
            type="text"
            name="sku"
            defaultValue={product?.sku || ""}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Images</label>
        <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
        <p className="text-xs text-gray-500 mt-1">Upload new images (adds to existing)</p>

        {product?.images && product.images.length > 0 && (
            <div className="flex gap-4 mt-4 flex-wrap">
                {product.images.map(img => (
                    <div key={img.id} className="relative w-24 h-24 border rounded overflow-hidden">
                        <Image src={img.url} alt="Product" fill className="object-cover" />
                    </div>
                ))}
            </div>
        )}
      </div>

      {state?.message && <p className="text-red-500 text-sm">{state.message}</p>}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
        >
          {isPending ? "Saving..." : isEdit ? "Update Product" : "Create Product"}
        </button>
      </div>
    </form>
  );
}
