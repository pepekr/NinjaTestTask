import { Router } from "express";

const imageRouter = Router();

imageRouter.get("/full/:id", () => {
  // when user goes to a specific hero page, need to load all pictures
});

imageRouter.put("/addImage/:heroId", () => {});
imageRouter.delete("/deleteImage/:imageId", () => {});
export default imageRouter;
