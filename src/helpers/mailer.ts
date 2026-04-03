import bcryptjs from "bcryptjs";
import type { SentMessageInfo } from "nodemailer";
import nodemailer from "nodemailer";
import User from "@/model/userModel";
import { EmailType } from "./enums";
import { getMailTemplate } from "./mailTemplate";

interface EmailParams {
  email: string;
  emailType: EmailType;
  userId: string;
}

export async function sendEmail({
  email,
  emailType,
  userId,
}: EmailParams): Promise<SentMessageInfo | null> {
  try {
    // create a hashed token
    const hashedToken = await bcryptjs.hash(userId?.toString(), 10);

    if (emailType === EmailType.VERIFY) {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === EmailType.RESET) {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject:
        emailType === EmailType.VERIFY
          ? "Verify your email"
          : "Reset your password",
      html: getMailTemplate(emailType, process.env.DOMAIN || "", hashedToken),
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (err: unknown) {
    console.error(err instanceof Error ? err.message : "Unknown error");

    return null;
  }
}
