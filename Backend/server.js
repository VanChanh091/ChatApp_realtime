// import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config(); //need this library to read from file .env
const app = express();
const port = process.env.PORT || 8080;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.use("/auth", authRoutes);
app.use("/message", messageRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
  connectToMongoDB();
  console.log(`server running on port ${port}`);
});
