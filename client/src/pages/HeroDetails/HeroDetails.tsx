import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { Superhero } from "../../../../shared/interfaces/SuperHero";
import { useHeroImages } from "./useHeroImages";
import { Carousel } from "../../components/Carousel";

function HeroDetails() {
  const location = useLocation();
  const hero = location.state as Superhero;

  const { heroImages, getImages } = useHeroImages();

  useEffect(() => {
    if (hero) {
      console.log(hero, "CHECK");
      getImages(hero.id);
    }
  }, []);

  return Carousel(heroImages);
}

export default HeroDetails;
