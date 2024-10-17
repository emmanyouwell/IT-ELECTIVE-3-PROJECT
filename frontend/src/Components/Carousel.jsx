import { Carousel } from "@material-tailwind/react";
import img1 from '../assets/image/3.png'
import img2 from '../assets/image/4.png'
import img3 from '../assets/image/5.png'
const CarouselComponent = ({images}) => {
  return (
    <Carousel className="rounded-xl">
        {images.map((image, index) => (<img
        src={image}
        alt="image 1"
        className="h-full w-full object-cover"
      />))}
     
    </Carousel>
  );
}

export default CarouselComponent