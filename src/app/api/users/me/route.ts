import { type NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/model/userModel";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    //select all fields except password from our database
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({ message: "User Found", data: user });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 400 },
    );
  }
}
