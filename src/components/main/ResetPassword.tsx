"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { resetPassword } from "@/actions/resetPassword.action";
import { MIN_PASSWORD_LENGTH } from "@/helpers/password";

export const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const { success, message } = await resetPassword({ token, password });
      if (!success) {
        toast.error(message);
      } else {
        toast.success(message);
        router.push("/login");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsBtnDisabled(
      password.length === 0 ||
        confirmPassword.length === 0 ||
        token.length === 0,
    );
  }, [password, confirmPassword, token]);

  if (!token) {
    return (
      <div className="flex flex-col gap-4 text-center">
        <p className="text-sm text-gray-700">
          This link is missing a token. Open the link from your email, or
          request a new reset.
        </p>
        <Link
          href="/forgotPassword"
          className="text-black font-medium hover:underline text-sm"
        >
          Request password reset
        </Link>
        <Link href="/login" className="text-gray-600 text-sm hover:underline">
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          New password
        </label>
        <input
          type="password"
          id="password"
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"
          placeholder={`At least ${MIN_PASSWORD_LENGTH} characters`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="confirmPassword"
          className="text-sm font-medium text-gray-700"
        >
          Confirm password
        </label>
        <input
          type="password"
          id="confirmPassword"
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <button
        type="submit"
        disabled={isBtnDisabled || loading}
        className="mt-2 w-full bg-black text-white rounded-md py-2.5 text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        {loading ? "Updating…" : "Update password"}
      </button>
      <p className="text-center text-sm text-gray-600">
        <Link href="/login" className="text-black font-medium hover:underline">
          Back to sign in
        </Link>
      </p>
    </form>
  );
};
