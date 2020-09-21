/* eslint-disable camelcase */

export interface categoryShape {
    id: number;
    name: string;
}

export interface itemShape {
    id: number;
    name: string;
    description: string;
    price: string;
    unit: string;
    image: string | null;
    category: number;
}

export interface bannerShape {
    name: string;
    phone: number;
    street: string;
    city: string;
    state: string;
    postal: string;
    currency: string;
    image?: string;
    description?: string;
}
