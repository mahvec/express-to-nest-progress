import { MOCK_USERS, MOCK_PRODUCTS } from "./constant.mjs";

// Middleware to resolve the index of the user by the user id in the user router
export const resolveIndexByUserId = (req, res, next) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    return res.sendStatus(400);
  }
  const findUserIndex = MOCK_USERS.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) {
    return res.sendStatus(404);
  }
  req.findUserIndex = findUserIndex;
  next();
};

// middleware to resolve the index of the product by the product id
export const resolveIndexByProductId = (req, res, next) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    return res.sendStatus(400);
  }
  const findProductIndex = MOCK_PRODUCTS.findIndex(
    (product) => product.id === parsedId,
  );
  if (findProductIndex === -1) {
    return res.sendStatus(404);
  }
  req.findProductIndex = findProductIndex;
  next();
};