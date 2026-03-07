"use server";

import { cookies } from "next/headers";

export async function logoutUser() {
  try {
    const cookieStore = await cookies();
    cookieStore.set("token", "", { httpOnly: true, expires: new Date(0) });
    return { success: true, message: "Logout Successful" };
  } catch (err: unknown) {
    console.error(err instanceof Error ? err.message : "Unknown error");

    return { error: "Something went wrong!" };
  }
}
