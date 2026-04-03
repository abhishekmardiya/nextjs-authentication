import Link from "next/link";
import { ForgotPassword } from "@/components/main/ForgotPassword";

export const dynamic = "force-static";

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900 font-sans p-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-2">Forgot password</h1>
        <p className="text-sm text-gray-600 mb-6">
          Enter your email and we&apos;ll send you a link to reset your
          password.
        </p>
        <ForgotPassword />
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
