import { body, validationResult } from "express-validator";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import { studentRepository } from "../repositories/index.js";
import student from "../repositories/student.js";
import mongoose from "mongoose";

async function getAllStudents(req, res) {
  res.status(HttpStatusCode.OK).json({
    massage: "get student successfully",
    data: [
      {
        name: "Nguyen Van A",
        Age: 17,
      },
    ],
  });
  // res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
  //   message: "cannot get student",
  // });
}

async function getStudentById(req, res) {}

async function updateStudent(req, res) {}

async function insertStudent(req, res) {
  try {
    const student = await studentRepository.insertStudent(req.body);

    res.status(HttpStatusCode.INSERT_OK).json({
      message: "insert student successfully",
      student: student, // Trả về sinh viên mới được thêm (nếu thành công)
    });
  } catch (exception) {
    if (exception instanceof mongoose.Error.ValidationError) {
      // Lỗi validation
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "Validation failed",
        errors: exception.errors, // Trả về chi tiết lỗi
      });
    } else if (exception.message === "Student already exist") {
      // Lỗi sinh viên đã tồn tại
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: exception.message,
      });
    } else {
      // Các lỗi khác
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: "Cannot insert student",
      });
    }
  }
}

export default {
  getAllStudents,
  getStudentById,
  updateStudent,
  insertStudent,
};
