import Link from "next/link";
import { Suspense } from "react";
import { Login } from "@/components/main/Login";

export const dynamic = "force-static";

function LoginFallback() {
  return (
    <div className="flex flex-col gap-4 animate-pulse" aria-hidden="true">
      <div className="h-10 bg-gray-100 rounded-md" />
      <div className="h-10 bg-gray-100 rounded-md" />
      <div className="h-10 bg-gray-800 rounded-md mt-2 opacity-40" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900 font-sans p-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-6">Sign in</h1>

        <Suspense fallback={<LoginFallback />}>
          <Login />
        </Suspense>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-black font-medium hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
