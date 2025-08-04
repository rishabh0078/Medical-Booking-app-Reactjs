import express from "express";
import {
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUser,
  getUserProfile,
  getMyAppointments,
} from "../Controllers/userController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const userRoutes = express.Router();

userRoutes.get("/:id", authenticate, restrict(["admin", "patient"]), getSingleUser);
userRoutes.get("/", authenticate, restrict(["admin"]), getAllUser);
userRoutes.put("/:id", authenticate, restrict(["admin", "patient"]), updateUser);
userRoutes.delete("/:id", authenticate, restrict(["admin", "patient"]), deleteUser);
userRoutes.get(
  "/profile/me",
  authenticate,
  restrict(["admin", "patient"]),
  getUserProfile
);
userRoutes.get(
  "/appointments/my-appointments",
  authenticate,
  restrict(["admin", "patient"]),
  getMyAppointments
);

export default userRoutes;
