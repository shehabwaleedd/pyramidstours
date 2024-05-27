export interface Option {
    name: string;
    _id: string;
    price: number;
    number: number;
    childPrice?: number;
}

interface Pricing {
    adults?: number;
    children?: number;
    price: number;
    totalPrice: number;
    _id: string;
}

export interface SubscriptionData {
    tourDetails: {
        mainImg?: {
            url?: string;
        };
        title?: string;
        _id: string;
    };
    userDetails: {
        name: string;
        email: string;
        nationality: string;
        _id: string;
        avatar: {
            url: string
        };
    }
    time: string;
    date: string;
    day: string;
    adultPricing?: Pricing;
    childrenPricing?: Pricing;
    options: Option[];
    totalPrice: string;
    payment: string;
    createdAt: string;
    _id: string;

}
export interface Testimonial {
    avatar: {
        url: string;
        public_id: string;
    };
    _id: string;
    userName: string;
    description: string;
    rate: number;
    email: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

