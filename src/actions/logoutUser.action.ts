"use server";

import { cookies } from "next/headers";

interface LogoutUserResponse {
  success: boolean;
  message: string;
}

export async function logoutUser(): Promise<LogoutUserResponse> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");

    return { success: true, message: "Logout Successful" };
  } catch (err: unknown) {
    console.error(err instanceof Error ? err.message : "Unknown error");

    return { success: false, message: "Something went wrong!" };
  }
}
