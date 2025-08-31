import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Superhero } from "../../../../shared/interfaces/SuperHero";
import { useHeroImages } from "./useHeroImages";
import { Carousel } from "../../components/Carousel";


export default function HeroDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const hero = location.state as Superhero;
  const { heroImages, getImages, handleDeleteHero } = useHeroImages();

  useEffect(() => {
    if (hero) getImages(hero.id);
  }, [hero]);

  if (!hero) return <div className="text-center mt-10">Hero not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <div>
        <h1
          className="font-bold mb-6 text-center max-w-full text-indigo-600"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
        >
          {hero.nickname}
        </h1>

        {/* Carousel */}
        <div className="w-full mb-8">
          <Carousel images={heroImages} />
        </div>

        {/* Hero Info */}
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
          <p className="text-lg">
            <span className="font-semibold text-indigo-500">Real Name:</span>{" "}
            {hero.real_name}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-indigo-500">Origin:</span>{" "}
            {hero.origin_description}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-indigo-500">Superpowers:</span>{" "}
            {hero.superpowers}
          </p>
          <p className="text-lg italic text-gray-700">"{hero.catch_phrase}"</p>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex justify-between mt-6 gap-4">
        <button
          onClick={() => handleDeleteHero(hero.id)}
          className="px-4 py-2 bg-red-500 text-black rounded-lg hover:bg-red-600"
        >
          Delete Hero
        </button>
        <button
          onClick={() =>
            navigate(`/hero-edit/${hero.id}`, { state: { hero, heroImages } })
          }
          className="px-4 py-2 bg-blue-500 text-black rounded-lg hover:bg-blue-600"
        >
          Edit Hero
        </button>
      </div>
    </div>
  );
}
