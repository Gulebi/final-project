import { SortOrder } from "mongoose";

export interface IProduct {
    name: string;
    imageUrl: string | null;
    description: string;
    category: string;
    price: number;
    discount: number;
    discountPrice: number;
    currency: string;
    rating: number;
    numOfReviews: number;
    quantity: number;
    manufacturer: string;
}

export interface IGetProductsReq {
    page: number;
    limit: number;
    sortField: string;
    dir: SortOrder;
    search: string;
}
