"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { logoutUser } from "@/actions/logoutUser.action";

export default function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    try {
      const { success, message } = await logoutUser();

      if (!success) {
        toast.error(message);
        return;
      }

      toast.success("Logged out successfully");
      router.push("/login");
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  return (
    <button
      type="button"
      onClick={logout}
      className="text-sm font-medium text-gray-600 hover:text-black transition-colors cursor-pointer"
    >
      Sign out
    </button>
  );
}
