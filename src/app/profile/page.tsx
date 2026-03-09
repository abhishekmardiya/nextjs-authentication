import { redirect } from "next/navigation";
import { getMe } from "@/actions/getMe.action";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const { success, data } = await getMe();

  if (!success) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900 font-sans p-4">
      <div className="w-full max-w-md border border-gray-200 rounded-lg p-6 shadow-sm">
        <h1 className="text-xl font-semibold mb-6 text-center">
          Profile Details
        </h1>

        <div className="flex flex-col gap-4 mb-8 text-sm">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <span className="text-gray-500 font-medium">User ID</span>
            <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded text-black truncate max-w-48">
              {data?._id || "N/A"}
            </span>
          </div>

          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <span className="text-gray-500 font-medium">Username</span>
            <span className="font-medium text-gray-900">
              {data?.username || "N/A"}
            </span>
          </div>

          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <span className="text-gray-500 font-medium">Email</span>
            <span className="font-medium text-gray-900">
              {data?.email || "N/A"}
            </span>
          </div>

          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <span className="text-gray-500 font-medium">Status</span>
            <span
              className={`font-medium px-2 py-1 rounded-full text-xs ${data?.isVerified ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
            >
              {data?.isVerified ? "Verified" : "Unverified"}
            </span>
          </div>

          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <span className="text-gray-500 font-medium">Role</span>
            <span
              className={`font-medium px-2 py-1 rounded-full text-xs ${data?.isAdmin ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"}`}
            >
              {data?.isAdmin ? "Admin" : "User"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
