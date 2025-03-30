import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";
import supervisorRoutes from "./routes/supervisor.routes.js";
import studentRoutes from "./routes/student.routes.js";
import groupRoutes from "./routes/group.routes.js";
import messageRoutes from "./routes/message.routes.js";
import "dotenv/config";

const PORT = process.env.PORT;
const URL = process.env.DATABASE_URL;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/supervisors", supervisorRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/messages", messageRoutes)

mongoose.connect(URL).then(() => {
  console.log("mongodb connection successful");
  app.listen(PORT, () => {
    console.log(`server [STARTED] ~ http://localhost:${PORT}`);
  });
});
