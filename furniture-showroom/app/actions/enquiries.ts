"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateEnquiryStatus(id: string, status: string) {
  try {
    await prisma.enquiry.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin/enquiries");
    return { success: true };
  } catch {
    return { error: "Failed to update status" };
  }
}
