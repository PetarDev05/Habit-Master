import bcrypt from "bcrypt";

export const hashing = async (string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(string, salt);
  return hash;
};
