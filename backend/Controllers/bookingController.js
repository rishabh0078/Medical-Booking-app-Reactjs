import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";
import Stripe from "stripe";

export const getCheckoutSession = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);
    const user = await User.findById(req.userId);
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    // const amountInCents = Math.round(doctor.ticketPrice * 100);

    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ["card"],
    //   mode: "payment",
    //   success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
    //   cancel_url: `${req.protocol}://${req.get("host")}/doctors/${doctor.id}`,
    //   customer_email: user.email,
    //   client_reference_id: req.params.doctorId,
    //   line_items: [
    //     {
    //       price_data: {
    //         currency: "inr",
    //         unit_amount: amountInCents,
    //         product_data: {
    //           name: doctor.name,
    //           description: doctor.bio,
    //           images: [doctor.photo],
    //         },
    //       },
    //       quantity: 1,
    //     },
    //   ],
    // });
const session = {
  id: 'stripe_disabled_' + Date.now(),
  url: `${process.env.CLIENT_SITE_URL}/checkout-success`
};

    const booking = new Booking({
      doctor: doctor._id,
      user: user._id,
      ticketPrice: doctor.ticketPrice,
      session: session.id,
      appointmentDate: req.body.appointmentDate,
      slot: req.body.slot
    });

    await booking.save();

    res
      .status(200)
      .json({ success: true, message: "Successfully paid", session });
  } catch (err) {
    console.error("Error creating checkout session:", err);
    res
      .status(500)
      .json({ success: false, message: "Error creating checkout session" });
  }
};

export const getBookedSlots = async (req, res) => {
  try {
    const { doctorId, date } = req.query;
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const bookings = await Booking.find({
      doctor: doctorId,
      appointmentDate: { $gte: startOfDay, $lte: endOfDay }
    });

    const bookedSlots = bookings.map(b => b.slot);

    res.status(200).json({ success: true, bookedSlots });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch booked slots" });
  }
};

