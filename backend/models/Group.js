
import { Schema, model } from "mongoose";

const groupSchema = new Schema({
  name: { type: String, required: true },
  students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
  supervisor: [{ type: Schema.Types.ObjectId, ref: "Supervisor" }],
});

export const Group = model("Group", groupSchema);
