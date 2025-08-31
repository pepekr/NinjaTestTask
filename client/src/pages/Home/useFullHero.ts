import React, { useState } from "react";
import type { Superhero } from "../../../../shared/interfaces/SuperHero";
import type { HeroImage } from "../../../../shared/interfaces/HeroImage";
export function useFullHero({ setCounterOffset }: { setCounterOffset: React.Dispatch<React.SetStateAction<number>> }) {
  const [heroes, setHeroes] = useState<Superhero[]>([]);
  const [images, setImages] = useState<HeroImage[]>([]);

  async function getPageInfo(offset: number, take: number) {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/superheroes/${offset}/${take}`
    );
    if (!response.ok) {
    } 
    else {
      const { heroes, images }: { heroes: Superhero[]; images: HeroImage[] } =
        await response.json();
      if (heroes.filter((h) => h != null).length <= 0) {
        setCounterOffset(prev=>prev-take)
      } else {
        setImages(images.filter((img) => img != null));
        setHeroes(heroes);
      }
    }
  }
  return { heroes, images, getPageInfo };
}
