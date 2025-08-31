import { useState, type ChangeEvent, useEffect } from "react";
import type { SuperheroCreational } from "../../../../shared/interfaces/SuperHero.js";

export const useHeroForm = () => {
  const [hero, setHero] = useState<SuperheroCreational>({
    nickname: "",
    real_name: "",
    origin_description: "",
    superpowers: "",
    catch_phrase: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHero(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const filesArray = Array.from(e.target.files);
    const newPreviews = filesArray.map(file => URL.createObjectURL(file));

    setImages(prev => [...prev, ...filesArray]);
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    previews.forEach(url => URL.revokeObjectURL(url));
    setHero({
      nickname: "",
      real_name: "",
      origin_description: "",
      superpowers: "",
      catch_phrase: "",
    });
    setImages([]);
    setPreviews([]);
  };

  useEffect(() => {
    return () => previews.forEach(url => URL.revokeObjectURL(url));
  }, [previews]);

  return { hero, images, previews, handleChange, handleImageChange, removeImage, resetForm, setImages };
};
