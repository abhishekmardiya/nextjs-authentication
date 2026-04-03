"use server";

import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";

interface GetUserByIdResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    username: string;
    email: string;
    isVerified: boolean;
    isAdmin: boolean;
  } | null;
}

export async function getUserById(
  userId: string,
): Promise<GetUserByIdResponse> {
  try {
    await connect();

    if (!userId) {
      return { success: false, message: "User ID is required", data: null };
    }

    // select all fields except password from our database
    const user = await User.findOne({ _id: userId }).select("-password").lean();
    if (!user) {
      return { success: false, message: "User not found", data: null };
    }

    // convert _id to string for serialization
    return {
      success: true,
      message: "User Found",
      data: {
        ...user,
        _id: user._id.toString(),
      },
    };
  } catch (err: unknown) {
    console.error(err instanceof Error ? err.message : "Unknown error");

    return { success: false, message: "Something went wrong!", data: null };
  }
}
