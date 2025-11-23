"use server";

import { setSessionCookie } from "@/lib/appwrite/auth.helpers";
import {
  createAdminClient,
  createSessionClient,
  ID,
} from "@/lib/appwrite/config";
import { redirect, RedirectType } from "next/navigation";

export const signup = async (_prevState: unknown, formData: FormData) => {
  const { email, password, name, confirmPassword } = Object.fromEntries(formData);
  const { account } = createAdminClient();

  let verificationSent = false;
  // Validation
  const errors: string[] = [];
  // Name not empty
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    errors.push("Name is required.");
  }
  // Email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== "string" || !emailRegex.test(email)) {
    errors.push("Invalid email format.");
  }
  // Password requirements (min 8 chars, at least one letter and one number)
  if (
    !password ||
    typeof password !== "string" ||
    password.length < 8 ||
    !/[A-Za-z]/.test(password) ||
    !/[0-9]/.test(password)
  ) {
    errors.push("Password must be at least 8 characters long and contain both letters and numbers.");
  }
  // Passwords match
  if (password !== confirmPassword) {
    errors.push("Passwords do not match.");
  }
  if (errors.length > 0) {
    console.error("Validation errors:", errors);
    redirect(
      `/sign-up?error=${encodeURIComponent(errors.join(" "))}`,
      RedirectType.replace
    );
    return;
  }
  try {
    const userId = ID.unique();
    await account.create({
      userId,
      email: email as string,
      password: password as string,
      name: name as string,
    });
    const sessionCreated = await account.createEmailPasswordSession({
      email: email as string,
      password: password as string,
    });
    const { account: sessionClientAccount } = createSessionClient(
      sessionCreated.secret
    );

    const verificationCreated =
      await sessionClientAccount.createEmailVerification({
        url: `${process.env.NEXT_PUBLIC_APP_URL}/verify-email`,
      });
    verificationSent = !!verificationCreated.$id;
    await setSessionCookie(sessionCreated.secret);
  } catch (error) {
    console.error("Error creating user:", error);
  }

  redirect(
    `/verify-email?verificationSent=${verificationSent}`,
    RedirectType.replace
  );
};
