import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  sender: { type: String },
  receiver: { type: String },
  message: { type: String, required: true },
}, { timestamps: true });

export const Message = model("Message", messageSchema);
