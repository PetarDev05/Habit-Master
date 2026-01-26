import bcrypt from "bcrypt";

export const compareHashes = async (string, hashedString) => {
  const match = await bcrypt.compare(string, hashedString);

  if (!match) {
    throw new APIError(401, "INVALID_CREDENTIALS", "Password is incorrect");
  }
};
