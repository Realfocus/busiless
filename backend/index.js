import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";
import "dotenv/config";

const PORT = process.env.PORT;
const URL = process.env.DATABASE_URL;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

mongoose.connect(URL).then(() => {
  console.log("mongodb connection successful");
  app.listen(PORT, () => {
    console.log(`server [STARTED] ~ http://localhost:${PORT}`);
  });
});
