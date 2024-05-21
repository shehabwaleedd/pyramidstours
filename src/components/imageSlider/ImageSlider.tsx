'use client'
import React, { useState, useCallback, useMemo } from "react";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { FaRegCircle, FaCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import "./ImageSlider.css";

type ImageSliderProps = {
    images: {
        image: string;
        name: string;
        url: string;
    }[];
    name: string;
};

const ImageSlider = React.memo(({ images }: ImageSliderProps) => {
    const [imageIndex, setImageIndex] = useState<number>(0);
    const [isImageOpen, setIsImageOpen] = useState(false);

    const toggleImageModal = useCallback(() => setIsImageOpen(!isImageOpen), [isImageOpen]);

    const showNextImage = useCallback(() => {
        setImageIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, [images.length]);

    const showPrevImage = useCallback(() => {
        setImageIndex((currentIndex) => (currentIndex - 1 + images.length) % images.length);
    }, [images.length]);

    const dots = useMemo(() => {
        return images.map((image, index) => (
            <button
                key={`${image.image}-${index}`}
                className="img-slider-dot-btn"
                aria-label={`View Image ${index + 1}`}
                onClick={() => setImageIndex(index)}
            >
                {index === imageIndex ? <FaCircle aria-hidden /> : <FaRegCircle aria-hidden />}
            </button>
        ));
    }, [images, imageIndex]);

    return (
        <>
            <section aria-label="Image Slider" className="image-slider">
                <a href="#after-image-slider-controls" className="skip-link"> Skip Image Slider Controls </a>
                <div className="image-slider-wrapper" onClick={toggleImageModal}>
                    {images.map((image, index) => (
                        <Image
                            key={`${image.image}-${index}`}
                            src={image.url}
                            alt={image.name || 'image'}
                            width={500}
                            height={500}
                            priority={index === 0}
                            loading={index === 0 ? 'eager' : 'lazy'}
                            aria-hidden={imageIndex !== index}
                            className="img-slider-img"
                            style={{ transform: `translateX(${-100 * imageIndex}%)` }}
                        />
                    ))}
                </div>
                <button onClick={showPrevImage} className="img-slider-btn left" aria-label="View Previous Image" style={{ left: 0 }}>
                    <SlArrowLeft aria-label="View Previous Image" />
                </button>
                <button onClick={showNextImage} className="img-slider-btn right" aria-label="View Next Image" style={{ right: 0 }}>
                    <SlArrowRight aria-label="View Next Image" />
                </button>
                <div className="image-slider-dots">
                    {dots}
                </div>
                <div id="after-image-slider-controls" />
            </section>
            <AnimatePresence mode="wait">
                {isImageOpen && (
                    <FullscreenModal
                        src={images[imageIndex].url}
                        isOpen={isImageOpen}
                        onClick={toggleImageModal}
                    />
                )}
            </AnimatePresence>
        </>
    );
});

ImageSlider.displayName = 'ImageSlider';

export default ImageSlider;

const FullscreenModal = React.memo(({ src, isOpen, onClick }: { src: string, isOpen: boolean, onClick: () => void }) => {
    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClick}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                zIndex: 1000,
                cursor: 'zoom-out',
            }}
        >
            <Image
                src={src}
                alt="Fullscreen Image"
                width={800}
                height={800}
                style={{ objectFit: 'contain' }}
            />
        </motion.div>
    );
});

FullscreenModal.displayName = 'FullscreenModal';
