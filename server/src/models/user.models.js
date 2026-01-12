import { Schema, model } from "mongoose";

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

userSchema.statics.saveUser = async function (username, email, password) {
  const user = await this.create({ username, email, password });
  return user;
};

userSchema.statics.saveRefreshToken = async function (userId, refreshToken) {
  await this.findByIdAndUpdate(userId, { refreshToken });
};

userSchema.statics.deleteRefreshToken = async function (userId) {
  await this.findByIdAndUpdate(userId, { refreshToken: null });
};

export default model("User", userSchema);
