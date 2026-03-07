"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getMe } from "@/actions/getMe.action";
import { logoutUser } from "@/actions/logoutUser.action";

export default function ProfilePage() {
  const router = useRouter();
  const [usersData, setUsersData] = useState<{
    _id?: string;
    username?: string;
    email?: string;
    isVerified?: boolean;
    isAdmin?: boolean;
  }>({});
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      const res = await logoutUser();
      if (res.error) {
        toast.error(res.error);
        return;
      }
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await getMe();
        if (res.error) {
          toast.error(res.error);
          return;
        }
        if (res.data) {
          setUsersData(res.data);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("An unknown error occurred");
        }
        toast.error("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    getUserDetails();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900 font-sans p-4">
      <div className="w-full max-w-md border border-gray-200 rounded-lg p-6 shadow-sm">
        <h1 className="text-xl font-semibold mb-6 text-center">
          Profile Details
        </h1>

        {loading ? (
          <div className="text-center text-sm text-gray-500 py-4">
            Loading...
          </div>
        ) : (
          <div className="flex flex-col gap-4 mb-8 text-sm">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <span className="text-gray-500 font-medium">User ID</span>
              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded text-black truncate max-w-48">
                {usersData._id || "N/A"}
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <span className="text-gray-500 font-medium">Username</span>
              <span className="font-medium text-gray-900">
                {usersData.username || "N/A"}
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <span className="text-gray-500 font-medium">Email</span>
              <span className="font-medium text-gray-900">
                {usersData.email || "N/A"}
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <span className="text-gray-500 font-medium">Status</span>
              <span
                className={`font-medium px-2 py-1 rounded-full text-xs ${usersData.isVerified ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
              >
                {usersData.isVerified ? "Verified" : "Unverified"}
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <span className="text-gray-500 font-medium">Role</span>
              <span
                className={`font-medium px-2 py-1 rounded-full text-xs ${usersData.isAdmin ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"}`}
              >
                {usersData.isAdmin ? "Admin" : "User"}
              </span>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={logout}
          className="w-full bg-white text-black border border-gray-300 rounded-md py-2.5 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors cursor-pointer"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
