"use client";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  Mail,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { verifyEmailAction } from "./actions";
import { Suspense, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { resendVerificationEmail } from "@/lib/appwrite/auth.helpers";

function VerifyEmail() {
  const [, verifyEmail] = useActionState(verifyEmailAction, undefined);
  const [, resendVerifyEmail] = useActionState(resendVerificationEmail, undefined);
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");
  const canVerify = secret && userId;
  const isVerified = searchParams.get("verified") === "true";

  if (!canVerify) {
    return (
      <div className="w-full max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-primary/10 p-6 ring-8 ring-primary/5">
            <Mail className="h-12 w-12 text-primary" />
          </div>
        </div>

        <h1 className="text-3xl font-bold tracking-tight mb-4">
          Check your inbox
        </h1>

        <p className="text-muted-foreground mb-8 text-lg">
          We&apos;ve sent a verification link to your email address. Please
          click the link in the email to verify your account.
        </p>

        <div className="space-y-4">
          <Link href="/sign-in">
            <Button
              variant="outline"
              size="lg"
              className="w-full h-12 rounded-full text-base font-semibold bg-transparent"
            >
              Back to Login
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground">
            Didn&apos;t receive an email?{" "}
            <form action={resendVerifyEmail}>
              <Button variant="link" type="submit" className="underline hover:text-foreground font-medium">
                Resend Email
              </Button>
            </form>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md text-center">
      <div className="mb-8 flex justify-center">
        <div className="rounded-full bg-primary/10 p-6 ring-8 ring-primary/5">
          {isVerified ? (
            <CheckCircle2 className="h-12 w-12 text-primary" />
          ) : (
            <Check className="h-12 w-12 text-primary" />
          )}
        </div>
      </div>

      <h1 className="text-3xl font-bold tracking-tight mb-4">
        {isVerified ? "Email Verified!" : "Verify your email"}
      </h1>

      <p className="text-muted-foreground mb-8 text-lg">
        {isVerified
          ? "Your email has been successfully verified. You can now access your account."
          : "Click the button below to verify your email address and activate your account."}
      </p>

      <div className="space-y-4">
        <form action={verifyEmail}>
          <input type="hidden" name="userId" value={userId || ""} />
          <input type="hidden" name="secret" value={secret || ""} />
          {!isVerified ? (
            <SubmitButton />
          ) : (
            <Link href="/sign-in">
              <Button
                size="lg"
                className="w-full h-12 rounded-full text-base font-semibold"
              >
                Continue to Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </form>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      size="lg"
      className="w-full h-12 rounded-full text-base font-semibold"
      type="submit"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Verifying...
        </>
      ) : (
        "Verify Email"
      )}
    </Button>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Wallet className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              PocketMentor
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Suspense
          fallback={
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          }
        >
          <VerifyEmail />
        </Suspense>
      </main>
    </div>
  );
}
