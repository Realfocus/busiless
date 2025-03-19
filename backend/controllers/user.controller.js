import cloudinary from "../utils/cloudinary.js";
import { User } from "../models/User.js";
import { generateAccessToken } from "../utils/generateToken.js";
import "dotenv/config";

export const addUser = async (req, res) => {
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

        const user = await User.create({
          ...body,
          image: result.secure_url,
        });

        console.log("user-info", user);

        res
          .status(201)
          .json({ message: "Sign up sucess,redirecting to login" });
      })
      .end(file.buffer); // Use buffer to send file
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ email });
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

//list of all supervisors
export const getSupervisors = async (req, res, next) => {
  try {
    const supervisors = await User.find({ userType: "supervisor" });
    res.status(200).json({ supervisors });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ users: users });
  } catch (error) {
    next(error);
  }
};

//list all students
export const getStudents = async (req, res, next) => {
  try {
    const students = await User.find({ userType: "student" });
    res.status(200).json({ students });
  } catch (error) {
    next(error);
  }
};

// Fetch user by ID
export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
