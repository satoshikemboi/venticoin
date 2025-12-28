
import express from "express";
import { getUsers, createUser, updateUser, deleteUser, signupUser, loginUser } from "../controllers/userController.js";
import { getMarkets } from "../controllers/marketController.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);

router.get("/", getUsers);
//router.get("/:id", getUsersById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

router.get("/markets", getMarkets);

export default router;
