import { useState } from "react";
import type { Superhero } from "../../../../shared/interfaces/SuperHero.js";
import type { HeroImage } from "../../../../shared/interfaces/HeroImage.js";

export const useHeroEdit = (
  initialHero: Superhero,
  initialImages: HeroImage[]
) => {
  const [hero, setHero] = useState(initialHero);
  const [images, setImages] = useState<File[]>([]);
  const [initialImagesState, setInitialImages] =
    useState<HeroImage[]>(initialImages);
  const [markedForDeletion, setMarkedForDeletion] = useState<Set<string>>(
    new Set()
  );
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setHero((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImages(Array.from(e.target.files));
  };

  const toggleMarkForDeletion = (imageId: string) => {
    setMarkedForDeletion((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) newSet.delete(imageId);
      else newSet.add(imageId);
      return newSet;
    });
  };

  const handleAddImages = async (heroId: string) => {
    if (images.length === 0) return;
    const formData = new FormData();
    images.forEach((file) => formData.append("images", file));

    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/images/addImages/${heroId}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    if (!res.ok) {
      const err = await res.json();
      alert(err);
    } else {
      const newImages: HeroImage[] = await res.json();
      setInitialImages((prev) => [...prev, ...newImages]);
      setImages([]);
    }
  };

  const handleDeleteMarkedImages = async () => {
    if (markedForDeletion.size === 0) return;

    try {
      const imagesToDelete = initialImagesState.filter((img) =>
        markedForDeletion.has(img.id)
      );

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/images/deleteImages`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(imagesToDelete),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error("Failed to delete images: " + JSON.stringify(err));
      }

      setInitialImages((prev) =>
        prev.filter((img) => !markedForDeletion.has(img.id))
      );
      setMarkedForDeletion(new Set());
    } catch (err: any) {
      console.error(err);
      alert(err.message);
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
      if (!res.ok) {
        setMessage("Failed to update hero")
        throw new Error("Failed to update hero");}

      await handleAddImages(hero.id);
      await handleDeleteMarkedImages();

      setMessage("Hero updated successfully!")
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    hero,
    images,
    initialImagesState,
    markedForDeletion,
    handleChange,
    handleImageChange,
    toggleMarkForDeletion,
    handleSubmit,
    isSubmitting,
    setImages,
    message,
    setMessage
  };
};
