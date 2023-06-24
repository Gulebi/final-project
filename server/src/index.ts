import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import "dotenv/config";
import router from "./router";

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", router);

mongoose.connect(MONGODB_URI).then(
    () => {
        console.log("App has connected to MongoDB");
        app.listen(PORT, () => console.log(`App running at http://localhost:${PORT}/`));
    },
    (err) => console.error(err)
);
