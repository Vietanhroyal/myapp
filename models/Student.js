import mongoose, { Schema, ObjectId } from "mongoose";
import pkg from "validator";
const { isStrongPassword } = pkg; // Lấy ra hàm isStrongPassword từ validator
import isEmail from "validator/lib/isEmail.js";

const studentSchema = new Schema({
  id: { type: ObjectId },
  name: {
    type: String,
    required: [true, "Name is required"],
    validate: {
      validator: (value) => value.length > 3,
      message: "User name must be at least 3 characters long",
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: (value) => isEmail(value),
      message: "Email is not in a valid format",
    },
  },
  languages: {
    type: [String], // define an array about languages vd: [english, vietnamese]
    required: [true, "Language is required"],
  },
  gender: {
    type: String,
    enum: {
      values: ["Male", "Female"],
      message: "{VALUE} is not supported",
    },
    require: true,
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    validate: {
      validator: (value) => value.length > 5 && value.length <= 20,
      message: "phone number must be at leat 5 characters, max 20",
    },
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
});

// Export model
export default mongoose.model("Student", studentSchema);
