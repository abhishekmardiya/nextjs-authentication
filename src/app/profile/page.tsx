"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [usersData, setUsersData] = useState<{
    _id?: string;
    username?: string;
    email?: string;
  }>({});
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.error || err.message);
      } else if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get("/api/users/me");
        setUsersData(res.data.data);
      } catch (_err: unknown) {
        toast.error("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    getUserDetails();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900 font-sans p-4">
      <div className="w-full max-w-sm border border-gray-200 rounded-lg p-6 shadow-sm">
        <h1 className="text-xl font-semibold mb-4 text-center">
          Profile Overview
        </h1>

        {loading ? (
          <div className="text-center text-sm text-gray-500 py-4">Loading...</div>
        ) : (
          <div className="flex flex-col gap-4 mb-6 text-sm">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <span className="text-gray-500 font-medium">Username</span>
              <span className="font-medium text-gray-900">
                {usersData.username || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <span className="text-gray-500 font-medium">Email</span>
              <span className="font-medium text-gray-900">
                {usersData.email || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <span className="text-gray-500 font-medium">User ID</span>
              <Link
                href={`/profile/${usersData._id}`}
                className="font-mono text-xs bg-gray-100 px-2 py-1 rounded text-black hover:bg-gray-200 transition-colors truncate max-w-36"
              >
                {usersData._id}
              </Link>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={logout}
          className="w-full bg-white text-black border border-gray-300 rounded-md py-2.5 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
