'use server';
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "../constants";
import { createAdminClient, createSessionClient } from "./config";
import { redirect } from "next/navigation";

export async function setSessionCookie(secret: string) {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });
}

export async function getSessionCookie() {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value;
}

export async function deleteSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getCurrentUser() {
  const sessionSecret = await getSessionCookie();

  if (!sessionSecret) {
    return null;
  }

  try {
    const { account } = createSessionClient(sessionSecret);
    const user = await account.get();
    return user;
  } catch (error) {
    console.error("Error fetching current user:", error);
    // Session is invalid
    await deleteSessionCookie();
    return null;
  }
}

export async function signOut() {
  const sessionSecret = await getSessionCookie();

  if (sessionSecret) {
    try {
      // Use session client to delete the session
      const { account } = createSessionClient(sessionSecret);
      await account.deleteSession({ sessionId: "current" });
    } catch (error) {
      // Session might already be invalid
      console.error("Error signing out:", error);
    }
  }

  await deleteSessionCookie();
  redirect("/sign-in");
}
export async function verifyEmail(userId: string, secret: string) {
  try {
    // Use admin client for verification
    const { account } = await createAdminClient();
    await account.updateEmailVerification({ userId, secret });

    return { success: true };
  } catch (error: unknown) {
    console.error("Error verifying email:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: errorMessage };
  }
}

export async function resendVerificationEmail() {
  const sessionSecret = await getSessionCookie();

  if (!sessionSecret) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    // Use session client to resend verification
    const { account } = createSessionClient(sessionSecret);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!appUrl) {
      throw new Error("App URL is not defined in environment variables.");
    }
    await account.createEmailVerification({
      url: `${appUrl}/verify-email`,
    });

    return { success: true };
  } catch (error: unknown) {
    return { success: false, error: (error as Error).message };
  }
}
