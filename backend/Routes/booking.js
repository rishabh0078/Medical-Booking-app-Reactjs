import express from 'express';
import { authenticate } from '../auth/verifyToken.js';
import { getCheckoutSession } from '../Controllers/bookingController.js';

const bookingRoutes = express.Router();

bookingRoutes.post("/checkout-session/:doctorId", authenticate, getCheckoutSession);

export default bookingRoutes;