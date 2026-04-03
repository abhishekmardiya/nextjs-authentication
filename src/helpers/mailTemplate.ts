import { EmailType } from "./enums";

export function getMailTemplate(
  emailType: EmailType,
  domain: string,
  hashedToken: string,
): string {
  return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; background-color: #fafafa;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; text-align: center;">
            <h2 style="color: #333333; margin-bottom: 20px;">
              ${emailType === EmailType.VERIFY ? "Verify Your Email Address" : "Reset Your Password"}
            </h2>
            <p style="color: #666666; font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
              ${
                emailType === EmailType.VERIFY
                  ? "Thank you for registering! Please verify your email address to get started."
                  : "We received a request to reset your password. Click the button below to choose a new one."
              }
            </p>
            <a href="${domain}/verifyEmail?token=${hashedToken}" 
               style="background-color: #000000; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; display: inline-block;">
              ${emailType === EmailType.VERIFY ? "Verify Email" : "Reset Password"}
            </a>
            <p style="color: #888888; font-size: 14px; margin-top: 30px; line-height: 1.5;">
              Or copy and paste this link into your browser:<br>
              <a href="${domain}/verifyEmail?token=${hashedToken}" style="color: #0066cc; word-break: break-all;">
                ${domain}/verifyEmail?token=${hashedToken}
              </a>
            </p>
          </div>
          <p style="color: #999999; font-size: 12px; text-align: center; margin-top: 20px;">
            If you didn't request this email, you can safely ignore it.
          </p>
        </div>
      `;
}
