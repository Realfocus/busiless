import { Router } from "express";
import multer from "multer";
import {
  addUser,
  getUser,
  logIn,
  getSupervisors,
  getAllUsers,
  getStudents,
} from "../controllers/user.controller.js";
import "dotenv/config";

const storage = multer.memoryStorage();
const parser = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const acceptedFormats = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/svg+xml",
    ];

    if (acceptedFormats.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only .webp, .jpeg, .jpg, .png, and .svg formats are allowed!",
        ),
        false,
      );
    }
  },
});

const router = Router();

router.post("/signup", parser.single("image"), addUser);
router.post("/login", logIn);
router.get("/", getAllUsers);
router.get("/supervisors", getSupervisors);
router.get("/students", getStudents);
router.get("/:id", getUser);

export default router;
