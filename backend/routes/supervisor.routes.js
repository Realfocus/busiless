import { Router } from "express";
import multer from "multer";
import "dotenv/config";
import { addSupervisor, getSupervisors, getSupervisorDetails, logInSupervisor } from "../controllers/supervisor.controller.js";

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

router.post("/signup", parser.single("image"), addSupervisor);
router.post("/login", logInSupervisor);
router.get("/", getSupervisors);
router.get("/:id", getSupervisorDetails);

export default router;
