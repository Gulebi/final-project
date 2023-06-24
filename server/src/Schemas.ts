import { Schema } from "mongoose";
import { IProduct } from "./types";

const ProductSchema = new Schema<IProduct>({
    name: String,
    imageUrl: String,
    description: String,
    category: String,
    price: Number,
    discount: Number,
    discountPrice: Number,
    currency: String,
    rating: String,
    numOfReviews: Number,
    quantity: Number,
    manufacturer: String,
});

const CategorySchema = new Schema<{ name: string }>({
    name: String,
});

export { ProductSchema, CategorySchema };
