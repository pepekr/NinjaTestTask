import { useState } from "react";
import type { Superhero} from "../../../../shared/interfaces/SuperHero.js";
import type { HeroImage } from "../../../../shared/interfaces/HeroImage.js";
//Copypaste from create, for now in order to work 
interface EditHeroProps {
  hero: Superhero;
  images: HeroImage[];
  onUpdate: (updatedHero: Superhero) => void; // callback after successful edit
}

export const useHeroEdit = (initialHero: Superhero, initialImages: HeroImage[]) => {
  const [hero, setHero] = useState(initialHero);
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHero((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleAddImages = async (heroId: string) => {
    console.log(heroId)
    if (images.length === 0) return;
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
      return newImages;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/superheroes/update/${hero.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(hero),
        }
      );

      if (!res.ok) throw new Error("Failed to update hero");


      const addedImages = await handleAddImages(hero.id);

      alert("Hero updated successfully!");
      if (addedImages) {
        setImages([]);
      }

    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { hero, images, handleChange, handleImageChange, handleSubmit, isSubmitting };
};
