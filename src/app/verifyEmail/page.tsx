import Link from "next/link";
import { redirect } from "next/navigation";
import { verifyEmailAction } from "@/actions/verifyEmailAction.action";

export const dynamic = "force-dynamic";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const { token } = searchParams;

  if (!token) {
    redirect("/login");
  }

  const { success } = await verifyEmailAction({ token });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900 font-sans p-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-2">Email Verification</h1>

        {success ? (
          <>
            <p className="text-sm text-green-600 mb-6">
              Your email has been verified successfully.
            </p>
            <Link
              href="/login"
              className="inline-block bg-black text-white rounded-md px-6 py-2.5 text-sm font-medium hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Go to sign in
            </Link>
          </>
        ) : (
          <>
            <p className="text-sm text-red-600 mb-6">
              Verification failed or link has expired.
            </p>
            <Link
              href="/login"
              className="inline-block bg-white text-black border border-gray-300 rounded-md px-6 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Return to sign in
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
