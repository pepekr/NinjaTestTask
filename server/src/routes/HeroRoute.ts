import {Router} from "express"

const heroRouter = Router()

heroRouter.get("/:offset/:take",()=>{
 // main page, one image per hero
});

heroRouter.delete("/delete/:id",()=>{
    //also need to delete all pictures 
});

heroRouter.put("/create", ()=>{
    // create hero, pictures, and save in storage
});

heroRouter.patch("/update/:id", ()=>{

});
export default heroRouter;