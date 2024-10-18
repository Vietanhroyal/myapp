import { print, outputType } from "../helpers/print.js";

export default class Exception extends Error {
  static WRONG_DB_USERNAME_PASSWORD = "Wrong database username or password.";
  static WRONG_CONNECTION_STRING = "Wrong server name or connection string.";
  static CANNOT_TO_CONNECT_MONGODB = "Cannot connect to MongoDB.";
  static USER_EXIST = "User already exist";
  static CANNOT_TO_REGISTER_USER = "Cant not register user";
  static WRONG_EMAIL_AND_PASSWORD = "wrong user name or password";
  static STUDENT_EXIST = "Student already exist";

  constructor(message, validationErrors = {}) {
    super(
      `${message} ${
        Object.keys(validationErrors).length > 0
          ? `: ${JSON.stringify(validationErrors)}`
          : ""
      }`
    );
    this.validationErrors = validationErrors; // Gán validationErrors cho instance của lỗi
    this.name = this.constructor.name; // Đặt tên cho lớp lỗi
    print(message, outputType.ERROR);
  }
}
