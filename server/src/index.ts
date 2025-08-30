import express from "express";
import cookieParser from "cookie-parser";
import heroRouter from "routes/HeroRoute.js";
import imageRouter from "routes/ImageRoute.js";
import { config } from "dotenv";
import cors from "cors";
config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);
app.use("/superheroes", heroRouter);
app.use("/images", imageRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
