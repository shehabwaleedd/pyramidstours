

import React from 'react';
import Image from 'next/image';
import styles from '../page.module.scss';
import { ImageUploaderProps } from '@/types/editTour';

const ImageUploader: React.FC<ImageUploaderProps> = ({ mainImg, setMainImg, setMainImgUrl, mainImgUrl }) => {

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setMainImg(file);
            setMainImgUrl('')
        }
    };

    return (
        <div className={styles.pricingField}>
            <label htmlFor="mainImg">Event&apos;s Main Image</label>
            <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
            />
            {mainImgUrl && (
                <Image
                    src={mainImgUrl}
                    alt="Main image"
                    width={500}
                    height={500}
                    onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
                />
            )}
            {mainImg && (
                <Image
                    src={URL.createObjectURL(mainImg)}
                    alt="Main image"
                    width={500}
                    height={500}
                    onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
                />
            )}
        </div>
    );
};

export default ImageUploader;