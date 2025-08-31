import React from "react";
import { useHeroEdit } from "./useHeroEdit.js";
import type { Superhero } from "../../../../shared/interfaces/SuperHero.js";
import type { HeroImage } from "../../../../shared/interfaces/HeroImage.js";
import { useLocation } from "react-router-dom";

const EditHero: React.FC = () => {
  const location = useLocation();
  const hero = location.state.hero as Superhero;
  const initialImages = location.state.heroImages as HeroImage[];

  const {
    hero: heroState,
    images,
    initialImagesState,
    markedForDeletion,
    handleChange,
    handleImageChange,
    toggleMarkForDeletion,
    handleSubmit,
    isSubmitting,
    setImages,
  } = useHeroEdit(hero, initialImages);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Edit Hero</h2>

      <div className="space-y-2 text-black">
        <label className="block text-sm font-medium text-gray-700">Nickname</label>
        <input
          name="nickname"
          value={heroState.nickname}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="space-y-2 text-black">
        <label className="block text-sm font-medium text-gray-700">Real Name</label>
        <input
          name="real_name"
          value={heroState.real_name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="space-y-2 text-black">
        <label className="block text-sm font-medium text-gray-700">Origin Description</label>
        <textarea
          name="origin_description"
          value={heroState.origin_description}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="space-y-2 text-black">
        <label className="block text-sm font-medium text-gray-700">Superpowers</label>
        <textarea
          name="superpowers"
          value={heroState.superpowers}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="space-y-2 text-black">
        <label className="block text-sm font-medium text-gray-700">Catch Phrase</label>
        <input
          name="catch_phrase"
          value={heroState.catch_phrase}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="space-y-2 text-black">
        <label className="block text-sm font-medium text-gray-700">Add Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer"
        />

        <div className="pl-5 text-gray-700 flex flex-wrap gap-2">
          {initialImagesState.map((img) => (
            <div key={img.id} className="relative">
              <img className="w-25 h-15 object-scale-down" src={img.url} />
              <button
                type="button"
                onClick={() => toggleMarkForDeletion(img.id)}
                className={`absolute top-0 right-0 rounded-full p-1 ${
                  markedForDeletion.has(img.id)
                    ? "bg-yellow-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {markedForDeletion.has(img.id) ? "Cancel" : "Delete"}
              </button>
            </div>
          ))}

          {images.map((file, idx) => (
            <div key={idx} className="relative">
              <img
                className="w-25 h-15 object-scale-down"
                src={URL.createObjectURL(file)}
                alt={file.name}
              />
              <button
                type="button"
                onClick={() => setImages((prev) => prev.filter((f) => f !== file))}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 rounded-xl font-semibold text-blue-950 bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? "Updating..." : "Update Hero"}
      </button>
    </form>
  );
};

export default EditHero;
