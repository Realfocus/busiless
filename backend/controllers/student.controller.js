import cloudinary from "../utils/cloudinary.js";
import { Student } from "../models/Student.js";
import { generateAccessToken } from "../utils/generateToken.js";
import { Group } from "../models/Group.js";
import * as argon2 from "argon2";
import "dotenv/config";

export const addStudent = async (req, res) => {
  try {

    const { body } = req;
    const { file } = req;

    if (!file) {
      return res.status(400).json({ message: "No image file provided." });
    }
    const { password, ...rest } = body
    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }

    const hash = await argon2.hash(password);
    cloudinary.uploader
      .upload_stream({ folder: "busiless" }, async (error, result) => {
        if (error) {
          return res.status(500).json({ message: error.message });
        }


        const user = await Student.create({
          ...rest,
          password: hash,
          ...body,
          image: result.secure_url,
        });
        await Group.findByIdAndUpdate(req.body.group, {
          $push: { students: user._id }
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

export const getStudents = async (req, res, next) => {
  try {
    const students = await Student.find()
    res.status(200).json({ students })
  } catch (error) {
    console.log(error.message);
    next(error);

  }
}

export const getStudentDetails = async (req, res, next) => {
  const { id } = req.params;
  try {


    const student = await Student.findById(id).select("-password");
    if (!student) {
      return res.status(404).json({ message: "Supervisor not found" });
    }
    res.status(200).json(student);

  } catch (error) {
    console.log(error.message);
    next(error);

  }
}

export const logInStudent = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await Student.findOne({ email });
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
