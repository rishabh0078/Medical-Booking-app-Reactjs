import React, { useState, useEffect } from "react";
import convertTime from "../../utils/convertTime";
import { BASE_URL } from "./../../config";
import { token } from "./../../config";
import { toast } from "react-toastify";

const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [dates, setDates] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);

  // Generate 30 days from today
  useEffect(() => {
    const generateDates = () => {
      const today = new Date();
      const dateArray = [];

      for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dateArray.push(date);
      }

      setDates(dateArray);
      if (dateArray.length > 0) {
        setSelectedDate(dateArray[0]);
      }
    };

    generateDates();
  }, []);

  useEffect(() => {
    if (!selectedDate) return;

    const fetchBookedSlots = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/bookings/booked-slots?doctorId=${doctorId}&date=${selectedDate.toISOString()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (data.success) {
          setBookedSlots(data.bookedSlots || []);
        } else {
          setBookedSlots([]);
        }
      } catch (err) {
        console.error("Error fetching booked slots:", err);
        setBookedSlots([]);
      }
    };

    fetchBookedSlots();
  }, [selectedDate, doctorId]);

  // Get available slots for selected date
  useEffect(() => {
    if (selectedDate && timeSlots && timeSlots.length > 0) {
      const dayName = selectedDate
        .toLocaleDateString("en-US", { weekday: "long" })
        .toLowerCase();
      const daySlots = timeSlots.find(
        (slot) => slot.day && slot.day.toLowerCase() === dayName
      );

      if (daySlots && daySlots.startingTime && daySlots.endingTime) {
        const slots = generateTimeSlots(
          daySlots.startingTime,
          daySlots.endingTime
        );
        setAvailableSlots(slots);
      } else {
        setAvailableSlots([]);
      }

      setSelectedSlot(null);
    }
  }, [selectedDate, timeSlots]);

  const generateTimeSlots = (startTime, endTime) => {
    const slots = [];
    const start = new Date(`2000-01-01 ${startTime}`);
    const end = new Date(`2000-01-01 ${endTime}`);

    while (start < end) {
      const hours = start.getHours().toString().padStart(2, "0");
      const minutes = start.getMinutes().toString().padStart(2, "0");
      const timeString = `${hours}:${minutes}`;
      slots.push(timeString);
      start.setMinutes(start.getMinutes() + 30);
    }

    return slots;
  };

  const categorizeTimeSlots = (slots) => {
    const categories = {
      morning: [],
      afternoon: [],
      evening: [],
    };

    slots.forEach((slot) => {
      const hour = parseInt(slot.split(":")[0]);
      if (hour >= 6 && hour < 12) {
        categories.morning.push(slot);
      } else if (hour >= 12 && hour < 17) {
        categories.afternoon.push(slot);
      } else if (hour >= 17 && hour < 22) {
        categories.evening.push(slot);
      }
    });

    return categories;
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
    return { day, month, weekday };
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const bookingHandler = async () => {
    if (!selectedDate) {
      toast.error("Please select an appointment date");
      return;
    }

    if (!selectedSlot) {
      toast.error("Please select a time slot");
      return;
    }

    try {
      const res = await fetch(
        `${BASE_URL}/bookings/checkout-session/${doctorId}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            appointmentDate: selectedDate.toISOString(),
            slot: selectedSlot,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message + " Please try again");
      }

      if (data.session && data.session.url) {
        window.location.href = data.session.url;
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="bg-white shadow-xl border border-gray-100 rounded-2xl overflow-hidden w-full max-w-md mx-auto sm:max-w-full sm:rounded-none p-2 sm:p-0">
      {/* Header Section */}
      <div className="px-3 py-4 sm:px-6 sm:py-5 border-b border-gray-100">
        <div>
          <p className="text-sm text-gray-600 font-medium">Consultation Fee</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-900">
              ₹{ticketPrice}
            </span>
            <span className="text-sm text-gray-500">per session</span>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-6 space-y-6">
        {/* Date Selection Calendar */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Select Date
          </h3>
          <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0">
            {dates.map((date, index) => {
              const { day, month, weekday } = formatDate(date);
              const isSelected =
                selectedDate &&
                date.toDateString() === selectedDate.toDateString();
              const today = isToday(date);

              return (
                <button
                  key={index}
                  onClick={() => setSelectedDate(date)}
                  className={`flex flex-col items-center justify-center flex-shrink-0 w-16 h-20 rounded-xl shadow-sm transition-all duration-200 border-2 ${isSelected
                      ? "bg-blue-600 text-white border-blue-600"
                      : today
                        ? "bg-blue-50 border border-blue-300 text-blue-600"
                        : "bg-white border border-gray-200 text-gray-700 hover:border-blue-400"
                    }`}
                >
                  <span
                    className={`text-xs font-medium ${isSelected ? "text-blue-100" : "text-gray-500"
                      }`}
                  >
                    {weekday}
                  </span>
                  <span
                    className={`text-xl font-bold my-1 ${isSelected
                        ? "text-white"
                        : today
                          ? "text-blue-700"
                          : "text-gray-800"
                      }`}
                  >
                    {day}
                  </span>
                  <span
                    className={`text-xs ${isSelected ? "text-blue-100" : "text-gray-500"
                      }`}
                  >
                    {month}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Slots Selection */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Available Slots
          </h3>
          {availableSlots.length > 0 ? (
            <div className="space-y-5">
              {(() => {
                const categorizedSlots = categorizeTimeSlots(availableSlots);
                return (
                  <>
                    {categorizedSlots.morning.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                            Morning
                          </h4>
                          <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            6 AM - 12 PM
                          </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {/* CURRENT MORNING SLOT BUTTONS ARE HERE */}
                          {categorizedSlots.morning.map((slot, index) => (
                            <button
                              key={`morning-${index}`}
                              onClick={() => setSelectedSlot(slot)}
                              disabled={bookedSlots.includes(slot)}
                              className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${bookedSlots.includes(slot)
                                  ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                                  : selectedSlot === slot
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-gray-700 border-gray-200 hover:border-blue-300"
                                }`}
                            >
                              {convertTime ? convertTime(slot) : slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {categorizedSlots.afternoon.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                            Afternoon
                          </h4>
                          <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            12 PM - 5 PM
                          </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {categorizedSlots.afternoon.map((slot, index) => (
                            <button
                              key={`afternoon-${index}`}
                              onClick={() => setSelectedSlot(slot)}
                              disabled={bookedSlots.includes(slot)}
                              className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${bookedSlots.includes(slot)
                                  ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                                  : selectedSlot === slot
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-gray-700 border-gray-200 hover:border-blue-300"
                                }`}
                            >
                              {convertTime ? convertTime(slot) : slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {categorizedSlots.evening.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                            Evening
                          </h4>
                          <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            5 PM - 10 PM
                          </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {categorizedSlots.evening.map((slot, index) => (
                            <button
                              key={`evening-${index}`}
                              onClick={() => setSelectedSlot(slot)}
                              disabled={bookedSlots.includes(slot)}
                              className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${bookedSlots.includes(slot)
                                  ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                                  : selectedSlot === slot
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-gray-700 border-gray-200 hover:border-blue-300"
                                }`}
                            >
                              {convertTime ? convertTime(slot) : slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">
                No slots available for selected date
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Try selecting a different date
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Book Appointment Button */}
      <div className="p-4 pt-0 sm:p-6 sm:pt-0">
        <button
          onClick={bookingHandler}
          disabled={!selectedDate || !selectedSlot}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-base ${selectedDate && selectedSlot
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
        >
          {!selectedDate || !selectedSlot
            ? "Select Date & Time"
            : "Book Appointment"}
        </button>

        <div className="text-center mt-3 text-xs text-gray-500">
          Secure payment • Instant confirmation
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
