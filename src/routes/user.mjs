import { Router } from "express";
import { MOCK_USERS } from "../utils/constant.mjs";
import { createUserValidation } from "../utils/validation.mjs";
import { validationResult, matchedData } from "express-validator";
import { resolveIndexByUserId } from "../utils/middleware.mjs";

const router = Router();

router.get("/api/users", (req, res) => {
  // console.log(req.query);
  console.log(req.sessionID);
  const { search } = req.query;

  // When search is missing/empty, return all users.
  if (!search || String(search).trim().length === 0) {
    return res.send(MOCK_USERS);
  }

  req.sessionStore.get(req.sessionID, (err, sessionStorage) => {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log(sessionStorage);
  });

  // Treat `search` as free-text search (case-insensitive) across user string fields.
  const searchValue = String(search).toLowerCase().trim();
  const matchedUsers = MOCK_USERS.filter((user) =>
    Object.values(user).some(
      (value) =>
        typeof value === "string" && value.toLowerCase().includes(searchValue),
    ),
  );

  return res.send(matchedUsers);
});

router.get("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;
  return res.status(200).send(MOCK_USERS[findUserIndex]);
});

// POST REQUESTS
router.post("/api/users", createUserValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map((error) => error.msg),
    });
  }
  const data = matchedData(req);
  const newUser = { id: MOCK_USERS[MOCK_USERS.length - 1].id + 1, ...data };
  MOCK_USERS.push(newUser);
  return res.status(201).send(newUser);
});

// PUT REQUESTS
router.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  MOCK_USERS[findUserIndex] = { ...MOCK_USERS[findUserIndex], ...body };
  return res.status(200).send({
    message: "User updated successfully",
    user: MOCK_USERS[findUserIndex],
  });
});

// PATCH REQUEST
router.patch("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  MOCK_USERS[findUserIndex] = { ...MOCK_USERS[findUserIndex], ...body };
  return res.status(200).send({
    message: "User updated successfully",
    user: MOCK_USERS[findUserIndex],
  });
});

// DELETE REQUEST
router.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;
  MOCK_USERS.splice(findUserIndex, 1);
  return res.status(200).send({ message: "User deleted successfully" });
});

export default router;
