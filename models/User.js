import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from "validator/lib/isEmail.js";

export default mongoose.model(
  "User",
  new Schema({
    id: { type: ObjectId },
    name: {
      type: String,
      required: true,
      validate: {
        validator: (value) => value.length > 3, // Sửa lỗi chính tả
        message: "Username must be at least 3 characters",
      },
    },
    email: {
      type: String,
      required: true, // Thêm yêu cầu cho email
      validate: {
        validator: (value) => isEmail(value),
        message: "Email is incorrect format",
      },
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
  })
);
