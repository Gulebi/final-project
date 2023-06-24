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
    name: string;
    image: string;
    description: string;
    category: string;
    price: number;
    salePrice: number;
    rating: number;
    numOfReviews: number;
}
