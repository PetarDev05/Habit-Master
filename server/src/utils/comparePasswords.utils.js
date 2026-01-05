import bcrypt from "bcrypt";

export const compareHashes = async (string, hashedString) => {
  const match = await bcrypt.compare(string, hashedString);
  return match;
};
