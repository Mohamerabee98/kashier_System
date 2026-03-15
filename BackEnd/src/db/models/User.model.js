import { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "cashier"],
    default: "cashier"
  }
});

export const User = model("User", userSchema);