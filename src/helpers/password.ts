import bcryptjs from "bcryptjs";

export const MIN_PASSWORD_LENGTH = 6;

const SALT_ROUNDS = 10;

export async function hashPassword(plainPassword: string): Promise<string> {
  const salt = await bcryptjs.genSalt(SALT_ROUNDS);
  return bcryptjs.hash(plainPassword, salt);
}
