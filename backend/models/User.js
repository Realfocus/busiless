import { Schema, model } from "mongoose";

const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  faculty: { type: String, required: true },
  image: { type: String, required: true },
  phone:{type:String},

  // Optional fields based on user type
  userType: { type: String, required: true },

  // Student-specific fields
  course: { type: String },
  studentId: { type: String },
  honor: { type: String },
  role: { type: String },

  // Supervisor-specific fields
  specialisation: { type: String },
  calendly: { type: String },
});

export const User = model("User", userSchema);
