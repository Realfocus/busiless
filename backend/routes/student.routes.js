import { Router } from "express";
import multer from "multer";
import { getStudents, getStudentDetails, addStudent, logInStudent } from "../controllers/student.controller.js";
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

router.post("/signup", parser.single("image"), addStudent);
router.post("/login", logInStudent);
router.get("/", getStudents);
router.get("/:id", getStudentDetails);

export default router;
