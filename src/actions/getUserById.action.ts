"use server";

import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";

export async function getUserById(userId: string) {
  try {
    await connect();

    if (!userId) {
      return { error: "User ID is required" };
    }

    // select all fields except password from our database
    const user = await User.findOne({ _id: userId }).select("-password").lean();
    if (!user) {
      return { error: "User not found" };
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

    return { error: "Something went wrong!" };
  }
}
