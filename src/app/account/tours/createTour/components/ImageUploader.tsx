import React from 'react';
import Image from 'next/image';
import styles from '../page.module.scss';
import { ImageUploaderProps } from '@/types/createTour';

const ImageUploader: React.FC<ImageUploaderProps> = ({ mainImg, setMainImg }) => {

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setMainImg(file);
    };

    return (
        <div className={styles.formField}>
            <label htmlFor="mainImg">Event&apos;s Main Image</label>
            <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
            />
            {mainImg && (
                <Image
                    src={URL.createObjectURL(mainImg)}
                    alt="Event Main Image"
                    title='Event Main Image'
                    width={500}
                    height={500}
                />
            )}
        </div>
    );
};

export default ImageUploader;