import { getCurrentUser } from "@/lib/appwrite/auth.helpers";
import { redirect } from "next/navigation";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }): Promise<React.ReactNode> => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/sign-in");
  }
  if (!user.emailVerification) {
    redirect("/verify-email");
  }
  return children;
};

export default ProtectedLayout;
