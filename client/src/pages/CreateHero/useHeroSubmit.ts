import { useState } from 'react';
import type { SuperheroCreational } from "../../../../shared/interfaces/SuperHero.js";

export const useHeroSubmit = (resetForm: () => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("")
  const handleSubmit = async (hero: SuperheroCreational, images: File[], e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const heroResponse = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/superheroes/create`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hero),
      });

      if (!heroResponse.ok) throw new Error('Failed to create hero');
      const createdHero: SuperheroCreational & { id: string } = await heroResponse.json();

      if (images.length > 0) {
        const formData = new FormData();
        images.forEach(file => formData.append("images", file));

        const imageResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_API_URL}/images/addImages/${createdHero.id}`,
          { method: "PUT", body: formData }
        );

        if (!imageResponse.ok) {
          const err = await imageResponse.json();
          setMessage(err);
        }
      }

      setMessage("Hero created succesfully")
      resetForm();

    } catch (error: any) {
      console.error(error);
      setMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, handleSubmit, message, setMessage };
};