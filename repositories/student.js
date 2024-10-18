import Exception from "../exceptions/Exceptions.js";
import { Student } from "../models/index.js";

const getAllStudents = async ({ page, size, searchString }) => {
  console.log("get all student with paging");
};

const insertStudent = async ({
  name,
  email,
  languages,
  gender,
  phoneNumber,
  address,
}) => {
  try {
    let existingStudent = await Student.findOne({ email }).exec();
    if (!!existingStudent) {
      throw new Exception(Exception.STUDENT_EXIST);
    }
    const newStudent = await Student.create({
      name,
      email,
      languages,
      gender,
      phoneNumber,
      address,
    });
  } catch (exception) {
    if (exception instanceof mongoose.Error.ValidationError) {
      throw new Exception("Validation error", exception.errors);
    }
    throw exception; // Ném lại các lỗi khác
  }
};

export default {
  getAllStudents,
  insertStudent,
};
