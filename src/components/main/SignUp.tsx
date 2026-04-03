"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { signupUser } from "@/actions/signupUser.action";

export const SignUp = () => {
  const router = useRouter();
  const [user, setUser] = useState({ username: "", password: "", email: "" });
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { success, message } = await signupUser(user);
      if (!success) {
        toast.error(message);
      } else {
        toast.success("Signup Successful");
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
      !(
        user.email.length > 0 &&
        user.password.length > 0 &&
        user.username.length > 0
      ),
    );
  }, [user]);

  return (
    <form onSubmit={onSignup} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="username" className="text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"
          placeholder="johndoe"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"
          placeholder="name@example.com"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"
          placeholder="Create a password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>
      <button
        type="submit"
        disabled={isBtnDisabled || loading}
        className="mt-2 w-full bg-black text-white rounded-md py-2.5 text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        {loading ? "Signing up..." : "Sign up"}
      </button>
    </form>
  );
};
