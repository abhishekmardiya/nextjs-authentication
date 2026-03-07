import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout Seccessfuly",
      success: true,
    });
    //removing token
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 },
    );
  }
}
