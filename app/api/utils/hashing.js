import bcrypt from "bcrypt";
import { config } from "@/app/api/utils/env-config";

export const hashedPassword = async (password) => {
  const salts = parseInt(config.saltRounds);
  const salt = await bcrypt.genSalt(salts);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};
