/*import cloudinary from "../utils/cloudinary.js";
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
};*/

import cloudinary from "../utils/cloudinary.js"
import { Supervisor } from "../models/Supervisor.js"
import { Group } from "../models/Group.js"
import { generateAccessToken } from "../utils/generateToken.js"
import * as argon2 from "argon2"
import "dotenv/config"

export const addSupervisor = async (req, res) => {
  try {
    const { body } = req
    const { file } = req

    // Enhanced validation
    if (!file) {
      return res.status(400).json({ message: "No image file provided." })
    }

    const { password, ...rest } = body
    if (!password) {
      return res.status(400).json({ message: "Password is required." })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return res.status(400).json({ message: "Invalid email format." })
    }

    // Check if email already exists
    const existingUser = await Supervisor.findOne({ email: body.email })
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered." })
    }

    // Hash password with argon2
    const hash = await argon2.hash(password, {
      type: argon2.argon2id, // More secure variant
      memoryCost: 2 ** 16, // Increase memory cost for better security
      timeCost: 3, // Increase time cost for better security
      parallelism: 1, // Keep parallelism at 1 for compatibility
    })

    // Improved error handling for Cloudinary upload
    try {
      const uploadPromise = new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({ folder: "busiless" }, (error, result) => {
          if (error) reject(error)
          else resolve(result)
        })

        // Handle the file buffer
        uploadStream.end(file.buffer)
      })

      const result = await uploadPromise

      // Create user with hashed password and image URL
      const user = await Supervisor.create({
        ...rest,
        password: hash,
        image: result.secure_url,
      })

      // Update group with new supervisor
      await Group.findByIdAndUpdate(req.body.group, {
        $push: { supervisor: user._id },
      })

      console.log("Supervisor created successfully:", user._id)

      res.status(201).json({
        message: "Sign up successful, redirecting to login",
        success: true,
      })
    } catch (uploadError) {
      console.error("Cloudinary upload error:", uploadError)
      return res.status(500).json({
        message: "Failed to upload profile image. Please try again.",
        error: uploadError.message,
      })
    }
  } catch (error) {
    console.error("Supervisor signup error:", error.message)
    res.status(500).json({
      message: "An error occurred during signup. Please try again.",
      error: error.message,
    })
  }
}

export const getSupervisors = async (req, res, next) => {
  try {
    const supervisors = await Supervisor.find()
    res.status(200).json({ supervisors })
  } catch (error) {
    console.error("Error fetching supervisors:", error.message)
    next(error)
  }
}

export const getSupervisorDetails = async (req, res, next) => {
  const { id } = req.params
  try {
    const supervisor = await Supervisor.findById(id).select("-password")
    if (!supervisor) {
      return res.status(404).json({ message: "Supervisor not found" })
    }
    res.status(200).json(supervisor)
  } catch (error) {
    console.error("Error fetching supervisor details:", error.message)
    next(error)
  }
}

export const logInSupervisor = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" })
    }

    // Find user by email
    const user = await Supervisor.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" })
    }

    // Verify password using argon2
    try {
      const isValidPassword = await argon2.verify(user.password, password)
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" })
      }
    } catch (verifyError) {
      console.error("Password verification error:", verifyError)
      return res.status(500).json({ message: "Authentication error" })
    }

    // Generate JWT token
    const accessToken = generateAccessToken({ userId: user._id })

    res.status(200).json({
      message: "Login successful",
      token: accessToken,
      user: {
        id: user._id,
        fullName: user.fullName,
        image: user.image,
      },
    })
  } catch (error) {
    console.error("Login error:", error.message)
    next(error)
  }
}
