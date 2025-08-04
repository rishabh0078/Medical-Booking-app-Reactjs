import express from "express";
import {
  getAllReviews,
  createReview,
} from "../Controllers/reviewController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const reviewRoutes = express.Router({ mergeParams: true });

reviewRoutes.get("/", getAllReviews);
reviewRoutes.post("/", authenticate, restrict(["patient"]), createReview);

export default reviewRoutes;
