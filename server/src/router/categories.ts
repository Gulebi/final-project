import { Router } from "express";
import { CategoryModel } from "../Models";

const router = Router();

router.get("/", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const mRes = await CategoryModel.find({});

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

        const mRes = await CategoryModel.findById(id);

        return res.status(200).send({ message: "Success", data: mRes });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.post("/add", async (req, res) => {
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

export default router;
