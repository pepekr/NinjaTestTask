import React from "react";
import { useHeroSubmit } from "./useHeroSubmit.js";
import { useHeroForm } from "./useHeroForm.js";

const CreateHero: React.FC = () => {
  const {
    hero,
    images,
    previews,
    handleChange,
    handleImageChange,
    removeImage,
    resetForm,
  } = useHeroForm();

  const { isSubmitting, handleSubmit } = useHeroSubmit(resetForm);

  return (
    <form
      onSubmit={(e) => handleSubmit(hero, images, e)}
      className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Create New Hero</h2>

      {/* Hero Details */}
      {[
        { label: "Nickname", name: "nickname" },
        { label: "Real Name", name: "real_name" },
        { label: "Catch Phrase", name: "catch_phrase" },
      ].map(({ label, name }) => (
        <div className="space-y-2" key={name}>
          <label className="block text-sm font-medium text-gray-700">{label}</label>
          <input
            name={name}
            value={hero[name as keyof typeof hero]}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      ))}

      {[
        { label: "Origin Description", name: "origin_description" },
        { label: "Superpowers", name: "superpowers" },
      ].map(({ label, name }) => (
        <div className="space-y-2" key={name}>
          <label className="block text-sm font-medium text-gray-700">{label}</label>
          <textarea
            name={name}
            value={hero[name as keyof typeof hero]}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      ))}

      {/* Image Upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Add Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer"
        />

        <div className="pl-5 text-gray-700 flex flex-wrap gap-2 mt-2">
          {previews.map((url, idx) => (
            <div key={idx} className="relative">
              <img
                className="w-24 h-24 object-cover rounded-md"
                src={url}
                alt={images[idx].name}
              />
              <button
                type="button"
                onClick={() => removeImage(idx)}
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
        {isSubmitting ? "Submitting..." : "Create Hero"}
      </button>
    </form>
  );
};

export default CreateHero;
