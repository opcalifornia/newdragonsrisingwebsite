"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/auth/dal";
import { enroll, setLessonComplete } from "@/lib/auth/enrollment-db";
import { getModuleBySlug } from "@/lib/data/modules";

export async function enrollInModule(moduleSlug: string) {
  const session = await verifySession();
  if (!getModuleBySlug(moduleSlug)) {
    throw new Error("Unknown module");
  }
  await enroll(session.userId, moduleSlug);
  revalidatePath(`/modules/${moduleSlug}`);
  revalidatePath("/account");
}

export async function toggleLessonComplete(
  moduleSlug: string,
  lessonId: string,
  complete: boolean,
) {
  const session = await verifySession();
  await setLessonComplete(session.userId, moduleSlug, lessonId, complete);
  revalidatePath(`/modules/${moduleSlug}`);
  revalidatePath("/account");
}
