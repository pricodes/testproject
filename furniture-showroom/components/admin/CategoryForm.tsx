"use client";

import { useActionState } from "react";
import { createCategory, updateCategory } from "@/app/actions/categories";
import { Category } from "@prisma/client";

interface CategoryFormProps {
  category?: Category;
}

export default function CategoryForm({ category }: CategoryFormProps) {
  const isEdit = !!category;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [state, action, isPending] = useActionState(async (prevState: any, formData: FormData) => {
    if (isEdit && category) {
        return await updateCategory(category.id, prevState, formData);
    } else {
        return await createCategory(prevState, formData);
    }
  }, null);

  return (
    <form action={action} className="max-w-xl space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          defaultValue={category?.name}
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
          defaultValue={category?.slug}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
        {state?.error?.slug && <p className="text-red-500 text-sm">{state.error.slug}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          defaultValue={category?.description || ""}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-24"
        />
        {state?.error?.description && <p className="text-red-500 text-sm">{state.error.description}</p>}
      </div>

      {/* Basic image URL input for now */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
         <input
          type="text"
          name="image"
          defaultValue={category?.image || ""}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>


      {state?.message && <p className="text-red-500 text-sm">{state.message}</p>}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
        >
          {isPending ? "Saving..." : isEdit ? "Update Category" : "Create Category"}
        </button>
      </div>
    </form>
  );
}
