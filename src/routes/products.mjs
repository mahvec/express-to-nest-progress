import { Router } from "express";
import { resolveIndexByProductId } from "../utils/middleware.mjs";
import { MOCK_PRODUCTS } from "../utils/constant.mjs";

const router = Router();

// ROUTING AND GET REQUESTS
router.get("/api/products", (req, res) => {
  console.log(req.headers.cookie);
  // console.log(req.cookies);
  res.status(200).send(MOCK_PRODUCTS);
});

router.get("/api/products/:id", resolveIndexByProductId, (req, res) => {
  const { findProductIndex } = req;
  return res.status(200).send(MOCK_PRODUCTS[findProductIndex]);
});

// POST REQUESTS
router.post("/api/products", (req, res) => {
  const { name, price } = req.body;
  const newProduct = {
    id: MOCK_PRODUCTS[MOCK_PRODUCTS.length - 1].id + 1,
    name,
    price,
  };
  MOCK_PRODUCTS.push(newProduct);
  return res.status(201).send(newProduct);
});

// ROUTE PARAMETERS
router.put("/api/products/:id", resolveIndexByProductId, (req, res) => {
  const { body, findProductIndex } = req;
  MOCK_PRODUCTS[findProductIndex] = {
    ...MOCK_PRODUCTS[findProductIndex],
    ...body,
  };
  return res.status(200).send({
    message: "Product updated successfully",
    product: MOCK_PRODUCTS[findProductIndex],
  });
});

router.patch("/api/products/:id", resolveIndexByProductId, (req, res) => {
  const { body, findProductIndex } = req;
  MOCK_PRODUCTS[findProductIndex] = {
    ...MOCK_PRODUCTS[findProductIndex],
    ...body,
  };
  return res.status(200).send({
    message: "Product updated successfully",
    product: MOCK_PRODUCTS[findProductIndex],
  });
});

//DELETE REQUEST
router.delete("/api/products/:id", resolveIndexByProductId, (req, res) => {
  const { findProductIndex } = req;
  MOCK_PRODUCTS.splice(findProductIndex, 1);
  return res.status(200).send({ message: "Product deleted successfully" });
});

export default router;
