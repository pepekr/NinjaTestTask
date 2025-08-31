import { useState } from "react";
import type { HeroImage } from "../../../../shared/interfaces/HeroImage";
import { useNavigate } from "react-router-dom";

export function useHeroImages() {
  const [heroImages, setImages] = useState<HeroImage[]>([]);
  const [message, setMessage] = useState("");
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
  async function handleDeleteHero(heroId: string) {

      const deletedId = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/superheroes/delete/${heroId}`,
        { method: "DELETE", }
      );

      if (!deletedId.ok) {
        const err = await deletedId.json();
        alert(err);
      } else {
        setMessage("Hero deleted")
      }
    
  }
  return { heroImages, getImages, handleDeleteHero, message };
}
