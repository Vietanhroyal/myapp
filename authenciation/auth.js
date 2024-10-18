import jwt from "jsonwebtoken";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";
export default function checkToken(req, res, next) {
  // if client access from login, register program will next (need'n auth)
  if (
    req.url.toLowerCase().trim() == "/users/login" ||
    req.url.toLowerCase().trim() == "/users/register"
  ) {
    next();
    return;
  }
  //we catch token from request
  const authHeader = req.headers?.authorization;
  //if token are invalid format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      message: "Token is required or invalid format",
    });
  }
  //catch token from request
  const token = authHeader.split(" ")[1];
  try {
    //verify token and check expired
    const jwtOject = jwt.verify(token, process.env.JWT_SECRET);
    const isExpired = Date.now() >= jwtOject.exp * 1000;

    if (isExpired) {
      return res.status(HttpStatusCode.OK).json({
        message: "Token is expired",
      });
    } else {
      next(); // token are verify
    }
  } catch (exception) {
    //tokem not verified
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: "token is invalit",
    });
  }
}
