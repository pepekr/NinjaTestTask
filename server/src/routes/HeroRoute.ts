import { Router } from "express";
import {deleteHero, createHero, updateHero, getHeroes} from "../Controllers/superheroController.js"
const heroRouter = Router();


heroRouter.get("/:offset/:take", getHeroes);

heroRouter.delete("/delete/:id", deleteHero);

heroRouter.put("/create", createHero);

heroRouter.patch("/update/:id", updateHero);
export default heroRouter;