import { Message } from "../models/Message.js";

export const addMessage = async (req, res) => {
  try {
    const { body } = req;
    const message = await Message.create(body);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find()
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
