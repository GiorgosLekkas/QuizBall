import React, { useState, useEffect } from 'react';

interface ImageSlideshowProps {
  images: string[];
  interval?: number;
}

const ImageSlideshow: React.FC<ImageSlideshowProps> = ({ images, interval = 5000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
        }, interval);

        return () => clearInterval(timer);
    }, [images.length, interval]);

    return (
        <div className="slideshow-container">
            {images.map((image, index) => (
                <div key = {index} className = {`slide ${index === currentIndex ? 'active' : ''}`} >
                    <img src={image} alt={`Slide ${index}`} />
                </div>
            ))}
        </div>
    );
};

export default ImageSlideshow;