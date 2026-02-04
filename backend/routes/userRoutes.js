
// backend/routes/userRoutes.js
import express from "express";
import { getMyProfile } from "../controllers/userController.js"; 
import { protect } from "../middleware/authMiddleware.js";

import { 
  getUsers, 
  getUserById, // Make sure this is included
  updateUser, 
  deleteUser, 
  signupUser, 
  loginUser 
} from "../controllers/userController.js";

const router = express.Router();

// Update your routes to use the correct names
router.post("/signup", signupUser); // Changed from createUser to signupUser
router.post("/login", loginUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/profile", protect, getMyProfile);

export default router;
