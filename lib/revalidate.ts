"use server";
import { revalidatePath } from "next/cache";

export async function revalPath(url: string) {
  revalidatePath(url);
}
