import express from "express";
import { createUser } from "../controllers/user.ts";

const router = express.Router();

/* TEST */
router.get("/", (req, res) => {
  res.json({ msg: "TEST" });
});
/* Create User */
router.post("/add", createUser);

export default router;
