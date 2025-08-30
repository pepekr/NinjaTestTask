import React, { useState } from "react";
import type { Superhero } from "../../../../shared/interfaces/SuperHero";
import type { HeroImage } from "../../../../shared/interfaces/HeroImage";
export function useFullHero() {
  const [heroes, setHeroes] = useState<Superhero[]>([]);
  const [images, setImages] = useState<HeroImage[]>([]);
  async function getPageInfo(offset: number, take: number) {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/superheroes/${offset}/${take}`
    );
    if (!response.ok) {
    } // make error component
    else {
      const { heroes, images }: { heroes: Superhero[]; images: HeroImage[] } =
        await response.json();
      console.log(heroes, images, "check");
      setImages(images.filter((img) => img != null));
      setHeroes(heroes);
    }
  }
  return { heroes, images, getPageInfo };
}
