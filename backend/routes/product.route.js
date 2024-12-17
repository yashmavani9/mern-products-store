import express from "express";

import { createprod, deleteprod, getprods, updateprod } from "../controller/product.controller.js";

const router = express.Router();

router.get("/",getprods);

router.post("/", createprod);

router.put("/:id", updateprod);

router.delete("/:id", deleteprod);

export default router;