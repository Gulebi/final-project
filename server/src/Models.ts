import { model } from "mongoose";
import { CategorySchema, ProductSchema } from "./Schemas";

const ProductModel = model("products", ProductSchema);
const CategoryModel = model("categories", CategorySchema);

export { ProductModel, CategoryModel };
