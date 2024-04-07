
import React from 'react';
import Image from 'next/image';
import styles from '../page.module.scss';
import { ImagesUploaderProps, ImageFile } from '@/types/createTour';

const ImagesUploader: React.FC<ImagesUploaderProps> = ({ uploadedImages, setUploadedImages }) => {

    const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const files = e.target.files;
        if (files) {
            const imageFiles: ImageFile[] = Array.from(files).map(file => ({ file }));
            setUploadedImages(imageFiles);
        }
    };

    return (
        <div className={styles.formField}>
            <label htmlFor="images">Event&apos;s Gallery Images</label>
            <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                multiple
            />
            <div className={styles.groupCheckboxes}>
                {uploadedImages.map((image, index) => (
                    <Image
                        key={index}
                        src={URL.createObjectURL(image.file)}
                        alt={`Event Gallery Image ${index + 1}`}
                        title={`Event Gallery Image ${index + 1}`}
                        width={500}
                        height={500}
                        onLoad={e => URL.revokeObjectURL(e.currentTarget.src)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ImagesUploader;