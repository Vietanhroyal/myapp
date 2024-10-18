import { body, param, validationResult } from "express-validator";
import { studentRepository, userRepository } from "../repositories/index.js";
import { EventEmitter } from "node:events";
import { json } from "express";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";
const myEvent = new EventEmitter();

// Listen to the event
myEvent.on("event.register.user", (params) => {
  console.log(
    `User registration event triggered with data: ${JSON.stringify(params)}`
  );
});

//login user
const login = async (req, res) => {
  //validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ errors: errors.array() });
  }

  // destructuring data from required
  const { email, password } = req.body;
  // Call repository to handle login logic

  try {
    let existingUser = await userRepository.login({ email, password });

    if (existingUser.success) {
      res.status(HttpStatusCode.OK).json({
        message: "login user successfully",
        data: existingUser,
      });
    }
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

//regiser user
const register = async (req, res) => {
  // Destructuring from req.body
  const { name, email, password, phoneNumber, address } = req.body;

  // Emit the event after registration with the user's data
  myEvent.emit("event.register.user", { name, email, phoneNumber, address });

  try {
    await userRepository.register({
      name,
      email,
      password,
      phoneNumber,
      address,
    });
    // Call repository to handle registration logic
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "User registered successfully",
    });
  } catch (exception) {}
};

const getDetailUser = async (req, res) => {
  // Logic for getting user details (implement if necessary)
};

export default {
  login,
  register,
  getDetailUser,
};
