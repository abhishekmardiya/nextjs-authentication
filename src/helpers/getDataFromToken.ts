import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string,
    ) as {
      id: string;
    };

    return decodedToken.id;
  } catch (_err) {}
};
