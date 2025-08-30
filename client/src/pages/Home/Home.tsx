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
    console.log("start");
    console.log(counterOffset);
    getPageInfo(counterOffset, 5);
  }, [counterOffset]);

  const getHeroImage = (heroId: string) =>
    images.find((img: HeroImage) => img.imageOwnerId === heroId)?.url;

  return (
    <>
      <div className="grid grid-cols-3 gap-6 p-6">
        {heroes.map((hero: Superhero) => {
          const img = getHeroImage(hero.id);
          return (
            <div
              onClick={() => {
                navigate(`/hero-details/${hero.id}`, {state:hero});
              }}
              key={hero.id}
              className="relative border rounded-lg shadow-md p-4 flex hover:cursor-pointer flex-col"
            >
              <div className="absolute top-2 right-2 flex gap-2 "></div>
              {img && (
                <img
                  src={img}
                  alt={hero.nickname}
                  className="w-32 h-32 object-cover rounded-full mb-4"
                />
              )}
              <h2 className="text-lg font-bold">NickName: {hero.nickname}</h2>
              <p className="text-sm text-gray-500">
                Real name: {hero.real_name}
              </p>
              <p className="mt-2 text-left">
                Origin Description: {hero.origin_description}
              </p>
              <p className="mt-2 font-semibold text-blue-600">
                SuperPowers: {hero.superpowers}
              </p>
              <p className="mt-1 italic">Catch phrase: "{hero.catch_phrase}"</p>
            </div>
          );
        })}
        {/* Arrow buttons for offset */}
      </div>
      <div className="w-full text-center">
        <button
          onClick={() =>
            setCounterOffset((prev) => (prev - 5 >= 0 ? prev - 5 : 0))
          }
        >
          {"<"}
        </button>
        <button onClick={() => setCounterOffset((prev) => prev + 5)}>
          {">"}
        </button>
      </div>
    </>
  );
};

export default Home;
