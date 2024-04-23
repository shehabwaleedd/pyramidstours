'use client'
import React, { useState } from "react";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { FaRegCircle, FaCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

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
    const [imageIndex, setImageIndex] = useState<number>(0);
    const [isImageOpen, setIsImageOpen] = useState(false);

    const toggleImageModal = () => setIsImageOpen(!isImageOpen);

    const showNextImage = () => {
        setImageIndex((currentIndex) => (currentIndex + 1) % images.length);
    };

    const showPrevImage = () => {
        setImageIndex((currentIndex) => (currentIndex - 1 + images.length) % images.length);
    };

    return (
        <>
            <section aria-label="Image Slider" className="image-slider">
                <a href="#after-image-slider-controls" className="skip-link"> Skip Image Slider Controls </a>
                <div className="image-slider-wrapper" onClick={toggleImageModal}>
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
            <AnimatePresence mode="wait">
                {isImageOpen && (
                    <FullscreenModal
                        src={images[imageIndex].url}
                        alt={images[imageIndex].name}
                        isOpen={isImageOpen}
                        onClick={toggleImageModal}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

export default ImageSlider;


const FullscreenModal = ({ src, alt, isOpen, onClick }: { src: string, alt: string, isOpen: boolean, onClick: () => void }) => {
    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}

            onClick={onClick} style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                zIndex: 1000, // High z-index to ensure it is on top of other content
                cursor: 'zoom-out', // Indicates you can click to close
            }}>
            <Image
                src={src}
                alt={alt}
                width={800}
                height={800}
                objectFit="contain"
            />
        </motion.div>
    );
};