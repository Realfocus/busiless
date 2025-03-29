import { Schema, model } from "mongoose";

const studentSchema = new Schema({
  group: { type: Schema.Types.ObjectId, ref: "Group", required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  faculty: { type: String, required: true },
  image: { type: String, required: true },
  phone: { type: String },
  userType: { type: String, required: true },
  course: { type: String },
  studentId: { type: String },
  honor: { type: String },
  role: { type: String },
});

export const Student = model("Student", studentSchema);
