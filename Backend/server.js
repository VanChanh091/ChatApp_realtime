// import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config(); //need this library to read from file .env
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.use("/auth", authRoutes);

app.listen(port, () => {
  connectToMongoDB();
  console.log(`server running on port ${port}`);
});
