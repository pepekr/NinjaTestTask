import Slider from "react-slick";
import type { HeroImage } from "../../../shared/interfaces/HeroImage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export const Carousel = (images : HeroImage[]) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    pauseOnHover: true,
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Slider {...settings}>
        {images.map((img) => (
          <div key={img.id}>
            <img
              src={img.url}
              alt="hero"
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};
