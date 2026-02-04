"use server";

import { prisma } from "@/lib/db";
import { z } from "zod";
const EnquirySchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email().optional().or(z.literal("")),
  message: z.string().optional(),
  productId: z.string().optional(),
});

type FormState = {
  error?: {
    name?: string[];
    phone?: string[];
    email?: string[];
    message?: string[];
    productId?: string[];
  };
  message?: string;
  success?: boolean;
} | null;

export async function submitEnquiry(prevState: FormState, formData: FormData) {
  const data = {
    name: formData.get("name") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string || undefined,
    message: formData.get("message") as string || undefined,
    productId: formData.get("productId") as string || undefined,
  };

  const validation = EnquirySchema.safeParse(data);

  if (!validation.success) {
    return { error: validation.error.flatten().fieldErrors };
  }

  try {
    await prisma.enquiry.create({
      data: validation.data,
    });
    return { success: true, message: "Enquiry submitted successfully. We will contact you soon." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}
