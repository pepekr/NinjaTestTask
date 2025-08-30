import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import type { SuperheroCreational } from "../../../shared/interfaces/SuperHero.js";

const CreateHero: React.FC = () => {
  const [hero, setHero] = useState<SuperheroCreational>({
    nickname: '',
    real_name: '',
    origin_description: '',
    superpowers: '',
    catch_phrase: '',
  });

  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHero(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImages(prev => [...prev, ...Array.from(e.target.files as FileList )]);
  };

  const handleSubmit = async (e: FormEvent) => {
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
          {
            method: "PUT",
            body: formData,
          }
        );

        if (!imageResponse.ok) {
          const err = await imageResponse.json();
          alert(err);
        }
      }

      alert("Hero created successfully!");

      setHero({
        nickname: '',
        real_name: '',
        origin_description: '',
        superpowers: '',
        catch_phrase: '',
      });
      setImages([]);

    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Create New Hero</h2>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Nickname</label>
        <input 
          name="nickname" 
          value={hero.nickname} 
          onChange={handleChange} 
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Real Name</label>
        <input 
          name="real_name" 
          value={hero.real_name} 
          onChange={handleChange} 
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Origin Description</label>
        <textarea 
          name="origin_description" 
          value={hero.origin_description} 
          onChange={handleChange} 
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Superpowers</label>
        <textarea 
          name="superpowers" 
          value={hero.superpowers} 
          onChange={handleChange} 
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Catch Phrase</label>
        <input 
          name="catch_phrase" 
          value={hero.catch_phrase} 
          onChange={handleChange} 
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Add Images</label>
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer"
        />
        <ul className="list-disc pl-5 text-gray-700">
          {images.map((img, idx) => (
            <li key={idx}>{img.name}</li>
          ))}
        </ul>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full py-3 rounded-xl font-semibold text-blue-950 bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Create Hero'}
      </button>
    </form>
  );
};

export default CreateHero;
