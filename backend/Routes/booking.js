import express from 'express';
import { authenticate } from '../auth/verifyToken.js';
import { getCheckoutSession, getBookedSlots } from '../Controllers/bookingController.js';

const bookingRoutes = express.Router();

bookingRoutes.post("/checkout-session/:doctorId", authenticate, getCheckoutSession);
bookingRoutes.get("/booked-slots", authenticate, getBookedSlots);


export default bookingRoutes;