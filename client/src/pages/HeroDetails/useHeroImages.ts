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
        const { heroImages } = await response.json();
        setImages(heroImages);
      }
    } catch (error) {}
  }
  async function handleAddImages(images: File[], heroId: string) {
    if (images.length > 0) {
      const formData = new FormData();
      images.forEach((file) => formData.append("images", file));
      const imageResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/images/addImages/${heroId}`,
        { method: "PUT", body: formData }
      );

      if (!imageResponse.ok) {
        const err = await imageResponse.json();
        alert(err);
      } else {
        const newImages: HeroImage[] = await imageResponse.json();
        setImages((prev) => [...prev, ...newImages]);
      }
    }
  }
  return { heroImages, getImages, handleAddImages };
}
