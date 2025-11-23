"use server";

import { getCurrentUser, setSessionCookie } from "@/lib/appwrite/auth.helpers";
import {
  createAdminClient,
  createSessionClient,
} from "@/lib/appwrite/config";
import { redirect, RedirectType } from "next/navigation";

export const signin = async (_prevSate: unknown, formData: FormData) => {
  const { email, password } = Object.fromEntries(formData);
  const { account } = createAdminClient();

  let verificationSent = false;
  try {
    const sessionCreated = await account.createEmailPasswordSession({
      email: email as string,
      password: password as string,
    });
    const { account: sessionClientAccount } = createSessionClient(
      sessionCreated.secret
    );
    const user = await sessionClientAccount.get();
    if (!user?.emailVerification) {
      const verificationCreated =
        await sessionClientAccount.createEmailVerification({
          url: `${process.env.NEXT_PUBLIC_APP_URL}/verify-email`,
        });
      verificationSent = !!verificationCreated.$id;
    }

    await setSessionCookie(sessionCreated.secret);
  } catch (error) {
    console.error("Error signing in:", error);
  }

  if (verificationSent) {
    redirect(
      `/verify-email?verificationSent=${verificationSent}`,
      RedirectType.replace
    );
  } else {
    redirect("/dashboard", RedirectType.replace);
  }
};
