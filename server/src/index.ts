import express from 'express';
import heroRouter from 'routes/HeroRoute.js';
import imageRouter from 'routes/ImageRoute.js';
const app = express();
const PORT = process.env.PORT || 4000;


app.use("/superheroes", heroRouter);
app.use("/images", imageRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});