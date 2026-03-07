import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import User from "@/model/userModel";

interface EmailParams {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: EmailParams) => {
  try {
    // create a hashed token
    const hashedToken = await bcryptjs.hash(userId?.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "0d078c202606bf",
        pass: "8c6a7d7eb284f9",
      },
    });

    const mailOptions = {
      from: "abhishekmardiya@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password", //
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyEmail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "Verify your email" : "Reset your password"
      }</p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (_err: unknown) {}
};
