import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";

  return (
    <nav className="fixed top-0 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-lg tracking-tight text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-purple-500 to-indigo-400 hover:opacity-80 transition-opacity"
        >
          Next.js Authentication
        </Link>

        <div className="flex items-center gap-6">
          {token ? (
            <>
              <Link
                href="/profile"
                className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
              >
                Profile
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="text-sm font-medium bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
