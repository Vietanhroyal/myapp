// repositories/user.js
import { print, outputType } from "../helpers/print.js";
import { User } from "../models/index.js"; // Using named import
import Exception from "../exceptions/Exceptions.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const login = async ({ email, password }) => {
  try {
    // Tìm người dùng theo email
    let existingUser = await User.findOne({ email }).exec();

    // Nếu tìm thấy người dùng
    if (existingUser) {
      // So sánh mật khẩu với bcrypt
      let isMatch = await bcrypt.compare(password, existingUser.password);

      // Nếu mật khẩu khớp
      if (isMatch) {
         let token =  jwt.sign(
          {
            data: existingUser,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "10 days",
          }
        );
        // Ở đây bạn có thể tạo token nếu cần
        return { 
          success: true,
          ...existingUser.toObject(),
          password: "not show",
          token: token,

         }; // Trả về thành công
      } else {
        throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD);
      }
    } else {
      throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD);
    }

    // Nếu không khớp hoặc không tìm thấy user
  } catch (exception) {
    // In ra lỗi nếu có vấn đề trong quá trình login
    console.error("Error during login process:", exception);
    throw exception; // Ném ra ngoại lệ để hàm login ở controller xử lý
  }
};

const register = async ({ name, email, password, phoneNumber, address }) => {
  try {
    //we check user are exist?
    let existingUser = await User.findOne({ email }).exec();
    if (!!existingUser) {
      throw new Exception(Exception.USER_EXIST);
    }
    //hash password
    const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //create user in database
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    });
    return {
      ...newUser._doc,
      password: "Not show",
    };
  } catch (exception) {
    //check model validation here

    console.error("Error during registration process:", exception);
  }
};

export default {
  login,
  register,
};
