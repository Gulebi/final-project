import { Router } from "express";
import { UserModel } from "../Models";

const router = Router();

router.get("/", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const mRes = await UserModel.find({});

        return res.status(200).send({ message: "Success", data: mRes });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.get("/byId/:id", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id } = req.params;

        const mRes = await UserModel.findById(id);

        return res.status(200).send({ message: "Success", data: mRes });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.get("/fullById/:id", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id } = req.params;

        const mRes = await UserModel.findById(id).populate("favorites", "cart", "orders.products");

        return res.status(200).send({ message: "Success", data: mRes });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.get("/favoritesById/:id", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id } = req.params;

        const mRes = await UserModel.findById(id).populate("favorites");

        return res.status(200).send({ message: "Success", data: mRes });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.get("/cartById/:id", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id } = req.params;

        const mRes = await UserModel.findById(id).populate("cart");

        return res.status(200).send({ message: "Success", data: mRes });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.get("/ordersById/:id", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id } = req.params;

        const mRes = await UserModel.findById(id).populate("orders.products");

        return res.status(200).send({ message: "Success", data: mRes });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.post("/addToFavoritesById/:id", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id } = req.params;

        const { productId } = req.body;

        const mRes = await UserModel.findByIdAndUpdate(id, { $push: { favorites: { _id: productId } } });

        return res.status(201).send({ message: "Success", data: mRes });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.post("/addToCartById/:id", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id } = req.params;

        const { productId } = req.body;

        const mRes = await UserModel.findByIdAndUpdate(id, { $push: { cart: { _id: productId } } });

        return res.status(201).send({ message: "Success", data: mRes });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.post("/addToOrdersById/:id", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id } = req.params;

        const { productId } = req.body;

        const mRes = await UserModel.findByIdAndUpdate(id, { $push: { orders: { _id: productId } } });

        return res.status(201).send({ message: "Success", data: mRes });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

export default router;
