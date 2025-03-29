import { Group } from "../models/Group.js";
export const addGroup = async (req, res, next) => {
  try {
    const { body } = req;
    const group = await Group.create(body);
    res.status(201).json({ group });

  } catch (error) {
    next(error);

  }
}

export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate("students").populate("supervisor");
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
