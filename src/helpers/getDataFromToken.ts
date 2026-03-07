import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const getDataFromToken = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || "";
    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string,
    ) as {
      id: string;
    };

    return decodedToken.id;
  } catch (err: unknown) {
    console.error(err instanceof Error ? err.message : "Unknown error");

    return null;
  }
};
