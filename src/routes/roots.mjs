import { Router } from "express";
import userRouter from "./user.mjs";
import productsRouter from "./products.mjs";

const router = Router();

router.use(userRouter);
router.use(productsRouter);


export default router;