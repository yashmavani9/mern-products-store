import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import path from "path";

import router from './routes/product.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const __dirname = path.resolve();

//for req.body
app.use(express.json());

app.use("/api/products", router);

if (process.env.NODE_ENV === "production") {
    //we made dist folder our static asssets
    //_dirname means go in the root that is -- mern-products-store, here
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    //anything other than 5 requests we have inside router
    //we will open index.html
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(5000, () => {
    connectDB();
    console.log(`server started at http://localhost:${port}`);
});

