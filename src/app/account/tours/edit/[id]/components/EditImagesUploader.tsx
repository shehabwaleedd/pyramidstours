// Image uploader component for editing tour images

import React from 'react';
import Image from 'next/image';
import { ErrorMessage } from 'formik';
import styles from '../page.module.scss';


const ImagesUploader: React.FC<ImagesUploaderProps> = ({
    uploadedImages,
    setUploadedImages,
    currentImages,
    setCurrentImages,
}) => {


    const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const files = e.target.files;
        if (files) {
            const imageFiles: ImageFile[] = Array.from(files).map(file => ({
                file,
                previewUrl: URL.createObjectURL(file),
            }));
            setUploadedImages([...uploadedImages, ...imageFiles]);
        }
    };



    const handleRemoveUploaded = (index: number) => {
        const newImages = [...uploadedImages];
        newImages.splice(index, 1);
        setUploadedImages(newImages);
    };

    const handleRemoveCurrent = (index: number) => {
        const newImages = [...currentImages];
        newImages.splice(index, 1);
        setCurrentImages(newImages);
    };

    return (
        <div className={styles.pricingField}>
            <input type="file" onChange={handleImageChange} accept="image/*" />
            <div className={styles.formField}>
                <h4>Uploaded Images:</h4>
                {uploadedImages.map((image, index) => (
                    <div key={index}>
                        <Image src={image.previewUrl} alt="Uploaded image" width={500} height={500} />
                        <button onClick={() => handleRemoveUploaded(index)}>Remove</button>
                    </div>
                ))}
            </div>
            <div className={styles.formField}>
                <h4>Current Images:</h4>
                <div className={styles.group}>
                    {currentImages?.map((image, index) => (
                        <div key={index} className={styles.formField}>
                            <Image src={image.url} alt="Current image" width={500} height={500} />
                            <button onClick={() => handleRemoveCurrent(index)}>Remove</button>
                        </div>
                    ))}
                </div>
            </div>
            <ErrorMessage name="images" component="div" className={styles.error} />
        </div>
    );
};

export default ImagesUploader;