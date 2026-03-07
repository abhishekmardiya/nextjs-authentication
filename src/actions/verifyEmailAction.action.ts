"use server";

import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";

export async function verifyEmailAction({ token }: { token: string }) {
  try {
    await connect();

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return { error: "Invalid Token" };
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return {
      success: true,
      message: "Email Verified Successfully",
    };
  } catch (err: unknown) {
    console.error(err instanceof Error ? err.message : "Unknown error");

    return { error: "Something went wrong!" };
  }
}
