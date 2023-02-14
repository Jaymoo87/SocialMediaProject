import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postsRouter from "./routes/posts.js";
import userRouter from "./routes/user.js";

const app = express();

dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postsRouter);
app.use("/user", userRouter);

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = "mongodb+srv://Jaymoo:Rowan2014@cluster0.fhtxyv6.mongodb.net/?retryWrites=true&w=majority";
mongoose.set("strictQuery", false);
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on: ${PORT}`)))
  .catch((error) => console.log(error.message));
