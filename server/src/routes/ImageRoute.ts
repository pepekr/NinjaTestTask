import { Router } from "express";
import {
  deleteImages,
  addImages,
  getAllHeroImages,
} from "../Controllers/imageController.js";
import multer from "multer";

const storage = multer.memoryStorage(); // keeps files in memory as Buffer
const upload = multer({ storage });
const imageRouter = Router();

imageRouter.get("/full/:heroId", async (req, res) => {
  await getAllHeroImages(req, res);
});

imageRouter.put("/addImages/:heroId", upload.array("images"), async (req, res) => {
  await addImages(req, res);
});
imageRouter.delete("/deleteImages/", async (req, res) => {
  await deleteImages(req, res);
});
export default imageRouter;
