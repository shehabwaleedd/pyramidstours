import React, { useState } from 'react';
import Image from 'next/image';
import { ErrorMessage } from 'formik';
import styles from '../page.module.scss';

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

    const handleRemoveUploaded = (index: number) => {
        // Create a new array without the removed image
        const newImages = [...uploadedImages];
        newImages.splice(index, 1);
        setUploadedImages(newImages);
        // Revoke URL to free up resources
        URL.revokeObjectURL(uploadedImages[index].previewUrl);
    };

    return (
        <div className={styles.pricingField}>
            <input type="file" multiple onChange={handleImageChange} accept="image/*" />
            <div className={styles.formField}>
                <h4>Uploaded Images:</h4>
                {uploadedImages.map((image, index) => (
                    <div key={index} className={styles.imageContainer}>
                        <Image src={image.previewUrl} alt="Uploaded image" width={500} height={500} />
                        <button onClick={() => handleRemoveUploaded(index)}>Remove</button>
                    </div>
                ))}
            </div>
            <ErrorMessage name="images" component="div" className={styles.error} />
        </div>
    );
};

export default ImagesUploader;
