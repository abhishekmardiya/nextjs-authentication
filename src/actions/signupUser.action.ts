"use server";

import bcryptjs from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";
import { EmailType } from "@/helpers/enums";
import { sendEmail } from "@/helpers/mailer";
import User from "@/model/userModel";

export async function signupUser(user: Record<string, string>) {
  try {
    await connect();

    const { username, email, password } = user;

    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return { error: "User already exists" };
    }

    // hashing
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

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

    return { error: "Something went wrong!" };
  }
}
