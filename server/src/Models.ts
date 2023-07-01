import { model } from "mongoose";
import { CategorySchema, ProductSchema, UserSchema } from "./Schemas";

const ProductModel = model("products", ProductSchema);
const CategoryModel = model("categories", CategorySchema);
const UserModel = model("users", UserSchema);

export { ProductModel, CategoryModel, UserModel };
