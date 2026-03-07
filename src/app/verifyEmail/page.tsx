"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { verifyEmailAction } from "@/actions/verifyEmailAction.action";

function VerifyEmailContent() {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    const verifyUserEmail = async () => {
      try {
        const res = await verifyEmailAction({ token });
        if (res.error) {
          setStatus("error");
        } else {
          setStatus("success");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("An unknown error occurred");
        }
        setStatus("error");
      }
    };

    if (token?.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="w-full max-w-md text-center">
      <h1 className="text-2xl font-semibold mb-2">Email Verification</h1>

      {status === "loading" && (
        <p className="text-sm text-gray-600 mb-6">
          Verifying your email address...
        </p>
      )}

      {status === "success" && (
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
      )}

      {status === "error" && (
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
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900 font-sans p-4">
      <Suspense
        fallback={
          <div className="text-sm text-gray-500">
            Loading verification process...
          </div>
        }
      >
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}
