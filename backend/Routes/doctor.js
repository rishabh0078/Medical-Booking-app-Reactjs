import express from "express";
import {
  updateDoctor,
  deleteDoctor,
  getSingleDoctor,
  getAllDoctor,
  getDoctorProfile,
} from "../Controllers/doctorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
import reviewRoutes from "./review.js";

const doctorRoutes = express.Router();

doctorRoutes.use("/doctorId/reviews", reviewRoutes);
doctorRoutes.get("/:id", getSingleDoctor);
doctorRoutes.get("/", getAllDoctor);
doctorRoutes.put("/:id", authenticate, restrict(["admin", "doctor"]), updateDoctor);
doctorRoutes.delete("/:id", authenticate, restrict(["admin", "doctor"]), deleteDoctor);
doctorRoutes.get(
  "/profile/me",
  authenticate,
  restrict(["admin", "doctor"]),
  getDoctorProfile
);

export default doctorRoutes;
