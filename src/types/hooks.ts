import { TourType } from "./homePageTours";

export interface User {
    id: string;
    _id: string;
    avatar?: { url: string };
    name: string;
    email: string;
    phone: string;
    country: string;
    region: string;
    company: string;
    gender: string;
    role: string;
    age: number;
    wishList: string[];
    data: TourType[];
    createdAt: string;
}