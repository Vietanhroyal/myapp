import mongoose from "mongoose";
import { print, outputType } from "../helpers/print.js";
import Exception from "../exceptions/Exceptions.js";

mongoose.set("strictQuery", true);
async function connect() {
  try {
    let connection = await mongoose.connect(process.env.MONGO_URI);
    print("Connected to MongoDB successfully", outputType.SUCCESS);
    return connection;
  } catch (error) {
    if (error.message.includes("Authentication failed")) {
      throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD);
    } else if (error.message.includes("ENOTFOUND")) {
      throw new Exception(Exception.WRONG_CONNECTION_STRING);
    } else {
      throw new Exception(Exception.CANNOT_TO_CONNECT_MONGODB);
    }
  }
}

export default connect;

