import { Router } from "express";

const imageRouter = Router();

imageRouter.get("/full/:id", () => {
  // when user goes to a specific hero page, need to load all pictures
});

imageRouter.put("/addImages/:heroId", () => {});
imageRouter.delete("/deleteImages/:imageId", () => {});
export default imageRouter;
