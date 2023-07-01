import { Router } from "express";
import productsRouter from "./products";
import categoriesRouter from "./categories";
import usersRouter from "./users";
import authRouter from "./auth";
import imagesRouter from "./images";

const router = Router();

router.use("/products", productsRouter);
router.use("/categories", categoriesRouter);
router.use("/users", usersRouter);
router.use("/auth", authRouter);
router.use("/images", imagesRouter);

export default router;
