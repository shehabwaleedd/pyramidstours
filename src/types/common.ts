import { TourType } from "./homePageTours";


interface Image {
    url: string;
    public_id: string;
    _id: string;
}

interface Option {
    name: string;
    _id: string;
    price: number;
    number: number;
    childPrice?: number;
}

interface UserDetails {
    avatar: Image;
    confirmedEmail: boolean;
    _id: string;
    name: string;
    email: string;
    phone: string;
    age: number;
    nationality: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
interface Pricing {
    adults?: number;
    children?: number;
    price: number;
    totalPrice: number;
    _id: string;
}

export interface SubscriptionData {
    message: string;
    data: {
        tourDetails: TourType;
        userDetails: UserDetails;
        time: string;
        date: string;
        day: string;
        adultPricing: Pricing;
        childrenPricing: Pricing;
        options: Option[];
        totalPrice: number;
        payment: string;
        _id: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
}