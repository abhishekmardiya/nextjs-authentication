import Link from "next/link";
import { Suspense } from "react";
import { ResetPassword } from "@/components/main/ResetPassword";

export const dynamic = "force-static";

function ResetPasswordFallback() {
  return (
    <div className="flex flex-col gap-4 animate-pulse" aria-hidden="true">
      <div className="h-10 bg-gray-100 rounded-md" />
      <div className="h-10 bg-gray-100 rounded-md" />
      <div className="h-10 bg-gray-800 rounded-md mt-2 opacity-40" />
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900 font-sans p-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-2">Set a new password</h1>
        <p className="text-sm text-gray-600 mb-6">
          Choose a new password for your account.
        </p>
        <Suspense fallback={<ResetPasswordFallback />}>
          <ResetPassword />
        </Suspense>
        <div className="mt-6 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link
            href="/login"
            className="text-black font-medium hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
