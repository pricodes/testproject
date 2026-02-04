"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const CategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase and hyphenated"),
  description: z.string().optional(),
  image: z.string().optional(),
});

type FormState = {
  error?: {
    name?: string[];
    slug?: string[];
    description?: string[];
    image?: string[];
  };
  message?: string;
} | null;

export async function createCategory(prevState: FormState, formData: FormData) {
  const data = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    description: formData.get("description") as string,
    image: formData.get("image") as string,
  };

  const validation = CategorySchema.safeParse(data);

  if (!validation.success) {
    return { error: validation.error.flatten().fieldErrors };
  }

  try {
    await prisma.category.create({
      data: validation.data,
    });
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error && (error as { code: string }).code === "P2002") {
      return { error: { slug: ["Slug already exists"] } };
    }
    return { message: "Something went wrong" };
  }

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function updateCategory(id: string, prevState: FormState, formData: FormData) {
    const data = {
      name: formData.get("name") as string,
      slug: formData.get("slug") as string,
      description: formData.get("description") as string,
      image: formData.get("image") as string,
    };

    const validation = CategorySchema.safeParse(data);

    if (!validation.success) {
      return { error: validation.error.flatten().fieldErrors };
    }

    try {
      await prisma.category.update({
        where: { id },
        data: validation.data,
      });
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "code" in error && (error as { code: string }).code === "P2002") {
        return { error: { slug: ["Slug already exists"] } };
      }
      return { message: "Something went wrong" };
    }

    revalidatePath("/admin/categories");
    redirect("/admin/categories");
}

export async function deleteCategory(id: string) {
    try {
        await prisma.category.delete({
            where: { id }
        });
        revalidatePath("/admin/categories");
        return { success: true };
    } catch {
        return { error: "Failed to delete" };
    }
}
