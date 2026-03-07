import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { type NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { email, password } = reqBody;

    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exists" },
        { status: 500 },
      );
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "invalid Password" }, { status: 400 });
    }

    //create token data
    const tokenData = {
      id: user._id,
      username: user.name,
      email: user.email,
    };

    //create token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET || "", {
      expiresIn: "1d",
    });

    const response = NextResponse.json({ message: "Login Successful" });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 },
    );
  }
}
