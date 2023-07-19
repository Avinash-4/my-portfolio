import { RefObject, useEffect } from "react";

export const handleScroll = (ref: RefObject<HTMLElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: "smooth",
      });
    }
  };


const ImagePreloader = ({ imageUrls  } : {imageUrls : string[]}) => {
  useEffect(() => {
    // Preload images
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, [imageUrls]);

  return null; // This component doesn't render anything
};

export default ImagePreloader;
