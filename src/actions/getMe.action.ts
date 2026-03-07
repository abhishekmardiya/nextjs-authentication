"use server";

import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/model/userModel";

export async function getMe() {
  try {
    await connect();

    const userId = await getDataFromToken();
    if (!userId) {
      return { error: "Unauthorized" };
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
