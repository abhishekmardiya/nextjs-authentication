"use server";

import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";

export interface LoginUserResponse {
  success: boolean;
  message: string;
}

export async function loginUser(
  user: Record<string, string>,
): Promise<LoginUserResponse> {
  try {
    await connect();

    const { email, password } = user;

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return { success: false, message: "User does not exists" };
    }

    const validPassword = await bcryptjs.compare(password, foundUser.password);
    if (!validPassword) {
      return { success: false, message: "invalid Password" };
    }

    // create token data
    const tokenData = {
      id: foundUser._id,
      username: foundUser.name,
      email: foundUser.email,
    };

    // create token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET || "", {
      expiresIn: "1d",
    });

    const cookieStore = await cookies();
    cookieStore.set("token", token, { httpOnly: true });

    return { success: true, message: "Login Successful" };
  } catch (err: unknown) {
    console.error(err instanceof Error ? err.message : "Unknown error");

    return { success: false, message: "Something went wrong!" };
  }
}
