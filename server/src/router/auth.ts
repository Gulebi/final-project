import { UserModel } from "../Models";
import { Router } from "express";

const router = Router();

router.post("/login", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) return res.status(404).send({ message: "Not Found" });
        else {
            if (user?.password === password) {
                return res.status(200).send({ message: "Success", data: user._id });
            } else return res.status(400).send({ message: "Incorrect Password" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.post("/signup", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { name, email, password } = req.body;

        const user = await UserModel.create({ name, email, password });

        if (!user) return res.status(500).send({ message: "Error" });
        else return res.status(200).send({ message: "Success", data: user._id });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

export default router;
