import { useState } from "react";
import type { HeroImage } from "../../../../shared/interfaces/HeroImage";

export function useHeroImages() {
  const [heroImages, setImages] = useState<HeroImage[]>([]);
  const [error, setError] = useState("");
  async function getImages(id: string) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/images/full/${id}`
      );

      if (!response.ok) {
       
      } // make component or just jsx logic
      else {
        const {heroImages} = await response.json();
        setImages(heroImages);
      }
    } catch (error) {}
  }
  return { heroImages, getImages };
}
