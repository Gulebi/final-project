import { Types } from "mongoose";

export interface IProduct {
    _id?: string;
    name: string;
    imageUrl: string;
    description: string;
    category: {
        _id: string;
        name: string;
    };
    priceData: {
        price: number;
        discount: number;
        originalPrice: number;
        currency: string;
    };
    rating: number;
    numOfReviews: number;
    quantity: number;
    manufacturer: string;
}

export interface ICategory {
    _id?: string;
    name: string;
}

// export interface IUser {
//     _id: string;
//     name: string;
//     email: string;
//     password: string;
//     favorites: [Types.ObjectId];
//     cart: [Types.ObjectId];
//     orders: [
//         {
//             date: Date;
//             products: [Types.ObjectId];
//         }
//     ];
// }

export interface IProductAddReq {
    name: string;
    imageUrl: string;
    description: string;
    category: {
        _id: string;
        name: string;
    };
    price: number;
    discount: number;
    originalPrice: number;
    currency: string;
    rating: number;
    numOfReviews: number;
    quantity: number;
    manufacturer: string;
}
