import React, { useState } from "react";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { FaRegCircle, FaCircle } from "react-icons/fa";


import "./ImageSlider.css";
import Image from "next/image";

type ImageSliderProps = {
    images: {
        image: string;
        name: string;
        url: string;
    }[];
    name: string;

};

export function ImageSlider({ images }: ImageSliderProps) {
    const [imageIndex, setImageIndex] = useState(0);

    const showNextImage = () => {
        setImageIndex((currentIndex) => (currentIndex + 1) % images.length);
    };

    const showPrevImage = () => {
        setImageIndex((currentIndex) => (currentIndex - 1 + images.length) % images.length);
    };

    return (
        <section aria-label="Image Slider" className="image-slider">
            <a href="#after-image-slider-controls" className="skip-link"> Skip Image Slider Controls </a>
            <div className="image-slider-wrapper">
                {images.map((image, index) => (
                    <Image
                        width={500}
                        height={500}
                        key={`${image.image}-${index}`}
                        src={image.url}
                        alt={image.name || 'image'}
                        aria-hidden={imageIndex !== index}
                        className="img-slider-img"
                        style={{ transform: `translateX(${-100 * imageIndex}%)` }}
                    />
                ))}
            </div>
            <button onClick={showPrevImage} className="img-slider-btn left" aria-label="View Previous Image" style={{ left: 0 }}>
                <SlArrowLeft aria-hidden />
            </button>
            <button onClick={showNextImage} className="img-slider-btn right" aria-label="View Next Image" style={{ right: 0 }}>
                <SlArrowRight aria-hidden />
            </button>
            <div className="image-slider-dots">
                {images.map((image, index) => (
                    <button
                        key={`${image.image}-${index}`}
                        className="img-slider-dot-btn"
                        aria-label={`View Image ${index + 1}`}
                        onClick={() => setImageIndex(index)}
                    >
                        {index === imageIndex ? <FaCircle aria-hidden /> : <FaRegCircle aria-hidden />}
                    </button>
                ))}
            </div>
            <div id="after-image-slider-controls" />
        </section>
    );
}

export default ImageSlider;
