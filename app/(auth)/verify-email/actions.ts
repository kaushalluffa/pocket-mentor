"use server";

import { createSessionClient } from "@/lib/appwrite/config";
import { SESSION_COOKIE_NAME } from "@/lib/constants";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export async function verifyEmailAction(
  _prevState: unknown,
  formData: FormData
) {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!session) {
    redirect(`/sign-in`, RedirectType.replace);
  }

  const { account } = createSessionClient(session as string);
  let verified = false;

  try {
    const { userId, secret } = Object.fromEntries(formData);
    if (
      !userId ||
      !secret ||
      typeof userId !== "string" ||
      typeof secret !== "string"
    ) {
      console.error("Invalid form data for email verification.");
      redirect(`/verify-email`, RedirectType.replace);
    }
    const verificationUpdated = await account.updateEmailVerification({
      userId,
      secret,
    });
    verified = !!verificationUpdated.$id;
  } catch (error) {
    console.error("Error verifying email:", error);
  }
  if (verified) {
    redirect(`/dashboard`, RedirectType.replace);
  } else {
    redirect("/sign-in", RedirectType.replace);
  }
}
