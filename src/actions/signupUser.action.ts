"use server";

import { connect } from "@/dbConfig/dbConfig";
import { EmailType } from "@/helpers/enums";
import { sendEmail } from "@/helpers/mailer";
import { hashPassword, MIN_PASSWORD_LENGTH } from "@/helpers/password";
import User from "@/model/userModel";

export interface SignupUserResponse {
  success: boolean;
  message: string;
  savedUser: {
    _id: string;
    username: string;
    email: string;
  } | null;
}

export async function signupUser(
  user: Record<string, string>,
): Promise<SignupUserResponse> {
  try {
    await connect();

    const { username, email, password } = user;

    if (password.length < MIN_PASSWORD_LENGTH) {
      return {
        success: false,
        message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
        savedUser: null,
      };
    }

    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return {
        success: false,
        message: "User already exists",
        savedUser: null,
      };
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    // send verification email
    await sendEmail({
      email,
      emailType: EmailType.VERIFY,
      userId: savedUser._id,
    });

    // using .toObject() or manual mapping since mongoose documents aren't plain objects
    return {
      success: true,
      message: "User created successfully",
      savedUser: {
        _id: savedUser._id.toString(),
        username: savedUser.username,
        email: savedUser.email,
      },
    };
  } catch (err: unknown) {
    console.error(err instanceof Error ? err.message : "Unknown error");

    return {
      success: false,
      message: "Something went wrong!",
      savedUser: null,
    };
  }
}
