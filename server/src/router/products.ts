import { Router, Request } from "express";
import { ProductModel } from "../Models";
import { SortOrder, Types } from "mongoose";
import { IProductAddReq } from "../types";

const router = Router();

router.get(
    "/",
    async (
        req: Request<
            object,
            object,
            object,
            { page: number; limit: number; sortField: string; dir: SortOrder; search: string }
        >,
        res
    ) => {
        try {
            res.set("Content-Type", "application/json");

            const { page = 1, limit = 10, sortField = "name", dir = "asc", search = "" } = req.query;

            const products = await ProductModel.find({ name: { $regex: search } })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .sort({ [sortField]: dir });

            const count = await ProductModel.countDocuments({ name: { $regex: search } });

            return res.status(200).send({ message: "Success", data: { products, count } });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: "Error", data: error });
        }
    }
);

router.post("/search", async (req: Request<object, object, { search: string }, object>, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { search = "" } = req.body;

        const mRes = await ProductModel.find({ name: { $regex: search, $options: "i" } }).limit(5);

        return res.status(200).send({ message: "Success", data: mRes });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error", data: error });
    }
});

router.get("/byId/:id", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id } = req.params;

        const mRes = await ProductModel.findById(id);

        return res.status(200).send({ message: "Success", data: mRes });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.get(
    "/byCategoryId/:categoryId",
    async (
        req: Request<
            { categoryId: string },
            object,
            object,
            { page: number; limit: number; sortField: string; dir: SortOrder }
        >,
        res
    ) => {
        try {
            res.set("Content-Type", "application/json");

            const { page = 1, limit = 10, sortField = "rating", dir = "desc" } = req.query;

            const { categoryId } = req.params;

            const products = await ProductModel.find({ "category._id": new Types.ObjectId(categoryId) })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .sort({ [sortField]: dir });

            const count = await ProductModel.countDocuments({ "category._id": new Types.ObjectId(categoryId) });

            return res.status(200).send({ message: "Success", data: { products, count } });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: "Error" });
        }
    }
);

router.post("/add", async (req: Request<object, object, IProductAddReq, object>, res) => {
    try {
        res.set("Content-Type", "application/json");

        const {
            name,
            imageUrl,
            description,
            category,
            price,
            discount,
            originalPrice,
            currency,
            rating,
            numOfReviews,
            quantity,
            manufacturer,
        } = req.body;

        const mRes = await ProductModel.create({
            _id: new Types.ObjectId(),
            name,
            imageUrl,
            description,
            category: {
                _id: new Types.ObjectId(category._id),
                name: category.name,
            },
            priceData: {
                price,
                discount,
                originalPrice,
                currency,
            },
            rating,
            numOfReviews,
            quantity,
            manufacturer,
        });

        return res.status(201).send({ message: "Success", data: mRes });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.put("/change/:id", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id } = req.params;
        const {
            name,
            imageUrl,
            description,
            category,
            price,
            discount,
            discountPrice,
            currency,
            rating,
            numOfReviews,
            quantity,
            manufacturer,
        } = req.body;

        const mRes = await ProductModel.findByIdAndUpdate(id, {
            name,
            imageUrl,
            description,
            category,
            price,
            discount,
            discountPrice,
            currency,
            rating,
            numOfReviews,
            quantity,
            manufacturer,
        });

        return res.status(200).send({ message: "Success", data: mRes });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.get("/delete/:id", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id } = req.params;

        await ProductModel.findByIdAndDelete(id);

        return res.status(200).send({ message: "Success" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

export default router;
