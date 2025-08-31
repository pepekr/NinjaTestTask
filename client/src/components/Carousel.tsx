import Slider from "react-slick";
import type { HeroImage } from "../../../shared/interfaces/HeroImage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarouselProps {
  images: HeroImage[];
}

function handleDeleteImage(id: string) {
  // TODO: delete single image by id
}

export const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Slider {...settings}>
        {images.map((img) => (
          <div key={img.id} className="relative">
            <img
              src={img.url}
              alt="hero"
              className="w-full h-auto object-contain rounded-lg"
            />
            <button
              onClick={() => handleDeleteImage(img.id)}
              className="absolute top-2 right-2 bg-red-500 text-black p-1 rounded-full shadow-md hover:bg-red-600"
            >
              ✕
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};
