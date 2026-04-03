"use server";

import { connect } from "@/dbConfig/dbConfig";
import { hashPassword, MIN_PASSWORD_LENGTH } from "@/helpers/password";
import User from "@/model/userModel";

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export async function resetPassword({
  token,
  password,
}: {
  token: string;
  password: string;
}): Promise<ResetPasswordResponse> {
  try {
    await connect();

    if (!token || !password) {
      return { success: false, message: "Token and password are required." };
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      return {
        success: false,
        message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
      };
    }

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return {
        success: false,
        message: "Invalid or expired reset link. Request a new one.",
      };
    }

    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();

    return { success: true, message: "Your password has been updated." };
  } catch (err: unknown) {
    console.error(err instanceof Error ? err.message : "Unknown error");

    return { success: false, message: "Something went wrong!" };
  }
}
