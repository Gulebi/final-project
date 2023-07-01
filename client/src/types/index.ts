export interface IRouteError {
    data: string;
    error: { message: string; stack: string };
    internal: boolean;
    status: number;
    statusText: string;
}

export interface IError {
    message: string;
    status: number;
}

export interface IHistoryItem {
    id: number;
    text: string;
}

export interface IProduct {
    _id: string;
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
    _id: string;
    name: string;
}

export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
}
