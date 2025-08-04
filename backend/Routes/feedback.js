import express from "express";
import { authenticate, restrict } from "../auth/verifyToken.js";
import { submitFeedback, getAllFeedback } from "../Controllers/feedbackController.js";

const feedbackRoutes = express.Router();

feedbackRoutes.post("/", submitFeedback);
feedbackRoutes.get("/", authenticate, restrict(["admin"]), getAllFeedback);

export default feedbackRoutes;