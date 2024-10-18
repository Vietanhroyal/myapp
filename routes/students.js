import express from "express";
import { studentControllers } from "../controllers/index.js";
const router = express.Router();

router.get("/", studentControllers.getAllStudents);

router.get("/:id", studentControllers.getStudentById);

router.patch("/", studentControllers.updateStudent);

router.post("/insert", studentControllers.insertStudent);

export default router;
