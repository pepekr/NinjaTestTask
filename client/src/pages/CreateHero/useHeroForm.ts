import { useState, type ChangeEvent } from 'react';
import type { SuperheroCreational } from "../../../../shared/interfaces/SuperHero.js";

export const useHeroForm = () => {
  const [hero, setHero] = useState<SuperheroCreational>({
    nickname: '',
    real_name: '',
    origin_description: '',
    superpowers: '',
    catch_phrase: '',
  });

  const [images, setImages] = useState<File[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHero(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImages(prev => [...prev, ...Array.from(e.target.files as FileList)]);
  };

  const resetForm = () => {
    setHero({
      nickname: '',
      real_name: '',
      origin_description: '',
      superpowers: '',
      catch_phrase: '',
    });
    setImages([]);
  };

  return { hero, images, handleChange, handleImageChange, resetForm };
};
