import { Router } from "express";
import {
  deleteImages,
  addImages,
  getAllHeroImages,
} from "../Controllers/imageController.js";
const imageRouter = Router();

imageRouter.get("/full/:heroId", async (req, res) => {
  await getAllHeroImages(req, res);
});

imageRouter.put("/addImages/:heroId", async (req, res) => {
  await addImages(req, res);
});
imageRouter.delete("/deleteImage/:imageId", async (req, res) => {
  await deleteImages(req, res);
});
export default imageRouter;
