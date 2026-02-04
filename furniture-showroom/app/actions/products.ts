"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { writeFile } from "fs/promises";
import { join } from "path";

const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase and hyphenated"),
  categoryId: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  price: z.string().optional(), // We'll parse to decimal
  dimensions: z.string().optional(),
  material: z.string().optional(),
  sku: z.string().optional(),
});

async function saveFile(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileName = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
  const path = join(process.cwd(), "public/uploads", fileName);
  await writeFile(path, buffer);
  return `/uploads/${fileName}`;
}

type FormState = {
  error?: {
    name?: string[];
    slug?: string[];
    categoryId?: string[];
    description?: string[];
    price?: string[];
    dimensions?: string[];
    material?: string[];
    sku?: string[];
  };
  message?: string;
} | null;

export async function createProduct(prevState: FormState, formData: FormData) {
  const data = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    categoryId: formData.get("categoryId") as string,
    description: formData.get("description") as string,
    price: formData.get("price") as string,
    dimensions: formData.get("dimensions") as string,
    material: formData.get("material") as string,
    sku: formData.get("sku") as string,
  };

  const validation = ProductSchema.safeParse(data);

  if (!validation.success) {
    return { error: validation.error.flatten().fieldErrors };
  }

  // Handle images
  const images = formData.getAll("images") as File[];
  const imageUrls: string[] = [];

  for (const image of images) {
    if (image.size > 0 && image.name !== "undefined") {
      const url = await saveFile(image);
      imageUrls.push(url);
    }
  }

  try {
    await prisma.product.create({
      data: {
        ...validation.data,
        price: data.price ? parseFloat(data.price) : null,
        images: {
          create: imageUrls.map((url, index) => ({
            url,
            isPrimary: index === 0,
          })),
        },
      },
    });
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error && (error as { code: string }).code === "P2002") {
      return { error: { slug: ["Slug already exists"] } };
    }
    console.error(error);
    return { message: "Something went wrong" };
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProduct(id: string, prevState: FormState, formData: FormData) {
    const data = {
      name: formData.get("name") as string,
      slug: formData.get("slug") as string,
      categoryId: formData.get("categoryId") as string,
      description: formData.get("description") as string,
      price: formData.get("price") as string,
      dimensions: formData.get("dimensions") as string,
      material: formData.get("material") as string,
      sku: formData.get("sku") as string,
    };

    const validation = ProductSchema.safeParse(data);

    if (!validation.success) {
      return { error: validation.error.flatten().fieldErrors };
    }

    // Handle new images
    const images = formData.getAll("images") as File[];
    const imageUrls: string[] = [];

    for (const image of images) {
      if (image.size > 0 && image.name !== "undefined") {
        const url = await saveFile(image);
        imageUrls.push(url);
      }
    }

    try {
      await prisma.product.update({
        where: { id },
        data: {
          ...validation.data,
          price: data.price ? parseFloat(data.price) : null,
          images: {
            create: imageUrls.map((url) => ({
              url,
              isPrimary: false,
            })),
          },
        },
      });
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "code" in error && (error as { code: string }).code === "P2002") {
        return { error: { slug: ["Slug already exists"] } };
      }
      return { message: "Something went wrong" };
    }

    revalidatePath("/admin/products");
    redirect("/admin/products");
}

export async function deleteProduct(id: string) {
    try {
        await prisma.product.delete({
            where: { id }
        });
        revalidatePath("/admin/products");
        return { success: true };
    } catch {
        return { error: "Failed to delete" };
    }
}
