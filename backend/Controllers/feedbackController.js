import Feedback from "../models/FeedbackSchema.js";

export const submitFeedback = async (req, res) => {
  try {
    const { email, subject, message } = req.body;
    const feedback = new Feedback({ email, subject, message });
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error submitting feedback", error: error.message });
  }
};

export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching feedbacks", error: error.message });
  }
};
