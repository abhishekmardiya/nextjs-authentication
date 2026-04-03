"use server";

import { connect } from "@/dbConfig/dbConfig";
import { EmailType } from "@/helpers/enums";
import { sendEmail } from "@/helpers/mailer";
import User from "@/model/userModel";

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

const GENERIC_MESSAGE =
  "If an account exists for that email, we sent password reset instructions.";

export async function requestPasswordReset({
  email,
}: {
  email: string;
}): Promise<ForgotPasswordResponse> {
  try {
    await connect();

    const trimmed = email.trim();
    if (!trimmed) {
      return { success: true, message: GENERIC_MESSAGE };
    }

    const user = await User.findOne({ email: trimmed });
    if (user) {
      await sendEmail({
        email: user.email,
        emailType: EmailType.RESET,
        userId: user._id.toString(),
      });
    }

    return { success: true, message: GENERIC_MESSAGE };
  } catch (err: unknown) {
    console.error(err instanceof Error ? err.message : "Unknown error");

    return { success: false, message: "Something went wrong!" };
  }
}
