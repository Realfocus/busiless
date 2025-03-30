import { Router } from "express";
import { addMessage, getMessages } from "../controllers/message.controller.js";

const router = Router();

router.get("/", getMessages);
router.post("/", addMessage);

export default router;
