import { Router, Request } from "express";
import { CategoryModel, ProductModel } from "../Models";
import { IGetProductsReq } from "../types";

const router = Router();

router.get("/", async (req: Request<object, object, object, IGetProductsReq>, res) => {
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
});

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

router.post("/byCategory", async (req: Request<object, object, { category: string }, object>, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { category } = req.body;

        const products = await ProductModel.find({ category: category });

        const count = await ProductModel.countDocuments({ category: category });

        return res.status(200).send({ message: "Success", data: { products, count: count } });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.post("/add", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

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

        const mRes = await ProductModel.create({
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

        return res.status(201).send({ message: "Success", data: mRes });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.get("/categories", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const mRes = await CategoryModel.find({});

        return res.status(200).send({ message: "Success", data: mRes });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.post("/addCategory", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { name } = req.body;

        const mRes = await CategoryModel.create({ name });

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
