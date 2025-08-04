import Review from "../models/ReviewSchema.js";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({});

        res.status(200).json({
            success: true,
            message: "Successfull",
            data: reviews,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Not found",
        });
    }
};

export const createReview = async (req, res) => {
    try {
      const doctorId = req.body.doctor || req.params.doctorId;
      const userId = req.body.user || req.params.userId;
      const doctor = await Doctor.findById(doctorId);
      const user = await User.findById(userId);
  
      if (!doctor) {
        return res.status(404).json({
          success: false,
          message: "Doctor not found",
        });
      }
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const newReview = new Review({
        doctor: doctorId,
        user: userId,
        reviewText: req.body.reviewText,
        rating: req.body.rating,
      });
  
      const savedReview = await newReview.save();
      doctor.reviews.push(savedReview._id);
      await doctor.save();
  
      res.status(200).json({
        success: true,
        message: "Review submitted successfully",
        data: savedReview,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };