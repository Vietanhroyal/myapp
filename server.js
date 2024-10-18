import express from "express";
import * as dotenv from "dotenv";
import { userRouter, studentRouter } from "./routes/index.js";
dotenv.config();
import connect from "./database/database.js";
import checkToken from "./authenciation/auth.js";

//create express program
const app = express();

//josn web token
app.use(checkToken);

// Middleware để xử lý JSON body
app.use(express.json());

const port = process.env.PORT || 3000;
//declare router
app.use("/users", userRouter);
app.use("/students", studentRouter);

//start Nodejs server by express
app.listen(port, async () => {
  await connect(); //conect mongoodb
  console.log(`listen on port ${port}`);
});
