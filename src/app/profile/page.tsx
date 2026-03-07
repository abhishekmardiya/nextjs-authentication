"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [usersData, setUsersData] = useState<{ _id?: string }>({});

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successfully");
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
      const res = await axios.get("/api/users/me");
      setUsersData(res.data.data);
    };

    getUserDetails();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <hr />
      <Link href={`/profile/${usersData._id}`}>{usersData._id}</Link>
      <br />
      <button
        type="button"
        className="bg-teal-500 border rounded-full p-2 text-white mt-6 m-auto"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
