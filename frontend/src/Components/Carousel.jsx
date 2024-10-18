import { Carousel, IconButton } from "@material-tailwind/react";
import img1 from '../assets/image/3.png'
import img2 from '../assets/image/4.png'
import img3 from '../assets/image/5.png'
import useWindowSize from "../hooks/useWindowSize";
const CarouselComponent = ({ images }) => {
  const {width} = useWindowSize();
  const isSmall = width < 768;
  const normalizedImages = Array.isArray(images) ? images : [images];
  return (
    <Carousel  prevArrow={({ handlePrev }) => (
      <IconButton
        variant="text"
        color="brown"
        size="lg"
        onClick={handlePrev}
        className="!absolute top-2/4 left-4 -translate-y-2/4"
        style={{opacity: isSmall ? 0.2 : 0.5}}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={4}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
      </IconButton>
    )} nextArrow={({ handleNext }) => (
      <IconButton
        variant="text"
        color="brown"
        size="lg"
        onClick={handleNext}
        className="!absolute top-2/4 !right-4 -translate-y-2/4"
        style={{opacity: isSmall ? 0.2 : 0.5}}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={4}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </IconButton>
    )} className="rounded-xl">
      {normalizedImages.map((image, index) => (<img
        key={index}
        src={image.url ? image.url : image}
        alt="image 1"
        className="h-[400px] w-full object-contain xl:object-cover"
      />))}

    </Carousel>
  );
}

export default CarouselComponent