import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { Superhero } from "../../../../shared/interfaces/SuperHero";
import { useHeroImages } from "./useHeroImages";

function HeroDetails() {
  const location = useLocation();
  const hero = location.state as Superhero;

  const { heroImages, getImages } = useHeroImages();

  useEffect(() => {
    if (hero) {
      console.log(hero, "CHECK");
      getImages(hero.id);
    }
  }, [hero]);

  return <div>{heroImages && heroImages.map((img) => <p key={img.id}>{img.url}</p>)}</div>;
}

export default HeroDetails;
