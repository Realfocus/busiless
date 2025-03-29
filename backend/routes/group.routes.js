import Router from "express";
import { addGroup, getGroups } from "../controllers/group.controller.js";

const router = Router();

router.post("/", addGroup);
router.get("/", getGroups);

export default router;
