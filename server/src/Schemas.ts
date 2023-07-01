import { Schema } from "mongoose";
import { IProduct, ICategory } from "./types";

const CategorySchema = new Schema<ICategory>({
    _id: Schema.Types.ObjectId,
    name: String,
});

const ProductSchema = new Schema<IProduct>({
    _id: Schema.Types.ObjectId,
    name: String,
    imageUrl: String,
    description: String,
    category: CategorySchema,
    priceData: {
        price: Number,
        discount: Number,
        originalPrice: Number,
        currency: String,
    },
    rating: Number,
    numOfReviews: Number,
    quantity: Number,
    manufacturer: String,
});

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    favorites: {
        type: [Schema.Types.ObjectId],
        default: [],
    },
    cart: {
        type: [Schema.Types.ObjectId],
        default: [],
    },
    orders: {
        type: [
            {
                date: Date,
                products: [Schema.Types.ObjectId],
                totalPrice: Number,
            },
        ],
        default: [],
    },
});

export { ProductSchema, CategorySchema, UserSchema };
