
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: false }, 
    country: { type: String, required: false },
    isAdmin: { type: Boolean, default: false } // Good to have for future features
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
