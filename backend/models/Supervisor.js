
import { Schema, model } from "mongoose";

const supervisorSchema = new Schema({
  group: { type: Schema.Types.ObjectId, ref: "Group", required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  faculty: { type: String, required: true },
  image: { type: String, required: true },
  phone: { type: String },
  userType: { type: String, required: true },
  specialisation: { type: String },
  calendly: { type: String },
});

export const Supervisor = model("Supervisor", supervisorSchema);
