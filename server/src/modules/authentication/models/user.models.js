import { Schema, model } from "mongoose";
import APIError from "../../../utils/APIError.utils.js";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.statics.registerUser = async function (username, email, hashedPassword) {
  const userByName = await this.findOne({ username });
  if (userByName) {
    throw new APIError(409, "USER_ALREADY_EXISTS", "User already exists with same username");
  }

  const userByEmail = await this.findOne({ email });
  if (userByEmail) {
    throw new APIError(409, "USER_ALREADY_EXISTS", "User already exists with same email");
  }

  const newUser = await this.create({ username, email, password: hashedPassword });
  return newUser;
};

userSchema.statics.signInUser = async function (username) {
  const existingUser = await this.findOne({ username });

  if (!existingUser) {
    throw new APIError(404, "USER_NOT_FOUND", "User not found");
  }

  return existingUser;
};

userSchema.statics.saveRefreshToken = async function (userId, refreshToken) {
  await this.findByIdAndUpdate(userId, { refreshToken });
};

userSchema.statics.deleteRefreshToken = async function (userId) {
  await this.findByIdAndUpdate(userId, { refreshToken: null });
};

userSchema.statics.deleteUserAccount = async function (userId) {
  await this.findByIdAndDelete(userId);
};

userSchema.statics.findUserById = async function (userId) {
  const user = await this.findOne({ _id: userId });

  if (!user) {
    throw new APIError(401, "INVALID_REFRESH_TOKEN", "Unable to extend session");
  }

  return user;
};

export default model("User", userSchema);
