import React, { useEffect, useState } from "react";
import { useFullHero } from "./useFullHero";
import type { Superhero } from "../../../../shared/interfaces/SuperHero";
import type { HeroImage } from "../../../../shared/interfaces/HeroImage";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [counterOffset, setCounterOffset] = useState<number>(0);
  const { heroes, images, getPageInfo } = useFullHero({ setCounterOffset });
  const navigate = useNavigate();

  useEffect(() => {
    getPageInfo(counterOffset, 5);
  }, [counterOffset]);

  const getHeroImage = (heroId: string) =>
    images.find((img: HeroImage) => img.imageOwnerId === heroId)?.url;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Superheroes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {heroes.map((hero: Superhero) => {
          const img = getHeroImage(hero.id);
          return (
            <div
              onClick={() => navigate(`/hero-details/${hero.id}`, { state: hero })}
              key={hero.id}
              className="relative border rounded-lg shadow-lg p-6 flex flex-col bg-white transition-transform hover:scale-105 hover:shadow-2xl cursor-pointer"
            >
              {img && (
                <img
                  src={img}
                  alt={hero.nickname}
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-2 border-blue-500"
                />
              )}
              <h2 className="text-xl font-bold text-center mb-1 text-gray-900">
                {hero.nickname}
              </h2>
              <p className="text-sm text-gray-500 text-left mb-2">
                Real Name: {hero.real_name}
              </p>
              <p className="text-gray-700 mb-2 text-left">
                <span className="font-semibold">Origin:</span> {hero.origin_description}
              </p>
              <p className="text-blue-600 font-semibold mb-2 text-left">
                Superpowers: {hero.superpowers}
              </p>
              <p className="italic text-gray-600  text-left">
                "{hero.catch_phrase}"
              </p>
            </div>
          );
        })}
      </div>

      {/* Pagination buttons */}
      <div className="w-full flex justify-center gap-4 mt-6">
        <button
          onClick={() => setCounterOffset((prev) => (prev - 5 >= 0 ? prev - 5 : 0))}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
        >
          {"< Prev"}
        </button>
        <p  className="px-4 py-2  text-blue-500 font-semibold rounded  transition">{(counterOffset/5)+1}</p>
        <button
          onClick={() => setCounterOffset((prev) => prev + 5)}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
        >
          {"Next >"}
        </button>
      </div>
    </div>
  );
};

export default Home;
