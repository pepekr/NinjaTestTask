import Slider from "react-slick";
import type { HeroImage } from "../../../shared/interfaces/HeroImage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarouselProps {
  images: HeroImage[];
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
          <div key={img.id} className="relative bg-gray-500">
            <img
              src={img.url}
              alt="hero"
              className="w-full max-h-100 object-scale-down rounded-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};
