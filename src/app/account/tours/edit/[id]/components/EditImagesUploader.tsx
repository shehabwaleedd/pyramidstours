import React, { useState } from 'react';
import Image from 'next/image';
import { ErrorMessage } from 'formik';
import styles from '../page.module.scss';
import { CurrentImage } from '@/types/createTour';

interface ImageFile {
    file: File;
    previewUrl: string;
}

interface ImagesUploaderProps {
    uploadedImages: ImageFile[];
    setUploadedImages: React.Dispatch<React.SetStateAction<ImageFile[]>>;
}

const ImagesUploader: React.FC<ImagesUploaderProps> = ({ uploadedImages, setUploadedImages }) => {
    const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const files = e.target.files;
        if (files) {
            // Create a new array of image files with previews
            const imageFiles: ImageFile[] = Array.from(files).map(file => ({
                file,
                previewUrl: URL.createObjectURL(file),
            }));
            setUploadedImages(imageFiles); // Replace the old images with the new ones
        }
    };


    return (
        <div className={styles.groupCheckboxes}>
            <input type="file" multiple onChange={handleImageChange} accept="image/*" />
            <div className={styles.formField}>
                {uploadedImages.map((image, index) => (
                    <div key={index} className={styles.imageContainer}>
                        <Image src={image.previewUrl} alt="Uploaded image" width={500} height={500} />
                    </div>
                ))}

            </div>
            <ErrorMessage name="images" component="div" className={styles.error} />
        </div>
    );
};

export default ImagesUploader;
