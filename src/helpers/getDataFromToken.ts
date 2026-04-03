import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getDataFromToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return null;
    }

    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string,
    ) as {
      id: string;
    };

    return decodedToken.id;
  } catch {
    return null;
  }
}
