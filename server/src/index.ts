import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { Request, Response } from "express";
import userRoutes from "./routes/user.ts";

/* CONFIG */
const app = express();
/* USE ENV FILES */
dotenv.config();
/* USE JSON REQUESTS */
app.use(express.json());
/* CORS RULES */
app.use(cors());

/* DEFINE THIS DIRECTORY TO BE PUBLIC FOR USERS */
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* TEST ROUTES */
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ status: 200, msg: "Hello World!" });
});
app.post("/", (_req: Request, res: Response) => {
  res.status(200).json({ status: 200, msg: "Hello World!" });
});

/* USER ROUTES */
app.use("/user", userRoutes);

/* MONGOOSE SETUP */
/* Server PORT */
const port = process.env.PORT || 3000;

/* CONNECT DATABASE */
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    console.log("Database Connected");
    /* SERVER START */
    app.listen(port, () => {
      console.log(`App is Listening to port: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
