export interface Img {
    url: string;
    public_id: string;
}
export interface ImageFile {
    
    file: File;

}

export interface CurrentImage {
    url: string;
    public_id: string;
}


export interface DynamicFieldArrayProps {
    name: string;
    label: string;
    fieldType: 'input' | 'select';
    options?: Array<{ label: string; value: string }>;

}

export interface Option {
    name?: string;
    price?: number;
}

export interface PricingDetail {
    adults?: number;
    children?: number;
    price: number;

}

export interface ImageFieldArrayProps {
    name: string;
    label: string;
}

export interface FormValues {
    title: string;
    description: string;
    mainImg: File | null;
    images: File[];
    options: Option[];
    isRepeated: boolean;
    repeatTime: string[];
    repeatDays: string[];
    dateDetails?: string;
    location: {
        from: string;
        to: string;
    };
    inclusions: string[];
    exclusions: string[];
    adultPricing: PricingDetail[];
    childrenPricing: PricingDetail[];
    duration: string[] | string;
    subtitle: string;
    hasOffer: boolean;
    [key: string]: unknown;
}

export interface CustomFieldProps {
    name: string;
    label?: string;
    fieldType: 'input' | 'textarea' | 'select' | 'checkbox' | 'file';
    setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
    options?: Array<{ label: string; value: string }>;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // New prop
    value?: string | number;
}

export interface GroupSize {
    label: string;
    value: number;
}


export interface PricingOptionsProps {
    name: 'adultPricing' | 'childrenPricing';

}

export interface ImageUploaderProps {
    mainImg: File | null;
    setMainImg: (img: File | null) => void;
}

export interface ImagesUploaderProps {
    uploadedImages: ImageFile[];
    setUploadedImages: (images: ImageFile[]) => void;
}

interface CheckboxOption {
    label: string;
    value: string;

}


export interface CheckboxGroupFieldArrayProps {
    name: string;
    options: CheckboxOption[];
    setFieldValue: (field: string, value: any) => void;
    values: string[];
}