import cloudinary from "../utils/cloudinary.js";
import { Supervisor } from "../models/Supervisor.js";
import { Group } from "../models/Group.js";
import { generateAccessToken } from "../utils/generateToken.js";
import * as argon2 from "argon2";
import "dotenv/config";

export const addSupervisor = async (req, res) => {
  try {

    const { body } = req;
    const { file } = req;

    if (!file) {
      return res.status(400).json({ message: "No image file provided." });
    }

    cloudinary.uploader
      .upload_stream({ folder: "busiless" }, async (error, result) => {
        if (error) {
          return res.status(500).json({ message: error.message });
        }

        const hash = await argon2.hash(body.password);

        const user = await Supervisor.create({
          password: hash,
          ...body,
          image: result.secure_url,
        });

        await Group.findByIdAndUpdate(req.body.group, {
          $push: { supervisor: user._id }
        })

        console.log("user-info", user);

        res
          .status(201)
          .json({ message: "Sign up sucess,redirecting to login" });
      })
      .end(file.buffer);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getSupervisors = async (req, res, next) => {
  try {
    const supervisors = await Supervisor.find()
    res.status(200).json({ supervisors })

  } catch (error) {
    console.log(error.message);
    next(error);

  }
}

export const getSupervisorDetails = async (req, res, next) => {
  const { id } = req.params;
  try {


    const supervisor = await Supervisor.findById(id).select("-password");
    if (!supervisor) {
      return res.status(404).json({ message: "Supervisor not found" });
    }
    res.status(200).json(supervisor);

  } catch (error) {
    console.log(error.message);
    next(error);

  }
}

export const logInSupervisor = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await Supervisor.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken({ userId: user._id });
    res.status(200).json({
      message: "Login successful",
      token: accessToken,
      user: {
        id: user._id,
        fullName: user.fullName,
        image: user.image,
      },
    });
  } catch (error) {
    next(error);
  }
};
