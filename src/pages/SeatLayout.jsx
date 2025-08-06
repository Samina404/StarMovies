import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";

const SeatLayout = () => {
  const { id } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();

  const timeSlots = ["03:00 PM", "06:00 PM", "09:00 PM"];
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);

  const bookedSeats = ["A8", "B9", "C8", "F6", "E8"]; // sample booked seats

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) {
      toast.error(`Seat ${seat} is already booked!`);
      return;
    }
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handleProceed = () => {
    if (!user) {
      toast.error("You must be logged in to proceed.");
      return;
    }
    if (!selectedTime || selectedSeats.length === 0) {
      toast.error("Please select time and seats.");
      return;
    }

    navigate("/checkout", {
      state: { id, selectedTime, selectedSeats },
    });
  };

  // Helper to render seat block
  const renderSeatRow = (label, count = 9) =>
    Array.from({ length: count }, (_, i) => `${label}${i + 1}`).map((seat) => {
      const isBooked = bookedSeats.includes(seat);
      const isSelected = selectedSeats.includes(seat);
      return (
        <button
          key={seat}
          onClick={() => handleSeatClick(seat)}
          disabled={isBooked}
          className={`w-10 h-10 rounded-md flex items-center justify-center text-sm font-bold border
            ${
              isBooked
                ? "bg-white/10 text-white/30 border-white/20 cursor-not-allowed"
                : isSelected
                ? "bg-primary text-black border-pink-300"
                : "bg-transparent border-pink-600 text-white hover:bg-white/10"
            }`}
        >
          {seat}
        </button>
      );
    });

  return (
    <div className="min-h-20 bg-[#0f0f10] text-white flex flex-col justify-between p-6">
      <div className="flex gap-10">
        
        {/* Seat Selection */}
        <div className="flex-1 flex flex-col items-center mt-20">
          <h2 className="text-2xl font-bold mb-4">Select your seat</h2>
          <img src={assets.screenImage} alt="screenside" />
          <p className="text-sm text-white/60 mb-10">SCREEN SIDE</p>

          <div className="space-y-6">
 {/* E & F block */}
            <div className=" ml-60 gap-[20px] mb-10 ">
              <div className="flex gap-2 mb-2">{renderSeatRow("A")} </div>
              <div className="flex gap-2">{renderSeatRow("B")}</div>
            </div>

            {/* A & B + C & D block */}
            <div className="flex gap-[50px]">
              {/* A + B */}
              <div>
                <div className="flex gap-2 mb-2">{renderSeatRow("C")}</div>
                <div className="flex gap-2">{renderSeatRow("D")}</div>
              </div>

              {/* C + D */}
              <div>
                <div className="flex gap-2 mb-2">{renderSeatRow("E")}</div>
                <div className="flex gap-2">{renderSeatRow("F")}</div>
              </div>
            </div>

           
            {/* G & H + I & J block */}
            <div className="flex gap-[50px]">
              {/* G + H */}
              <div>
                <div className="flex gap-2 mb-2">{renderSeatRow("G")}</div>
                <div className="flex gap-2">{renderSeatRow("H")}</div>
              </div>

              {/* I + J */}
              <div>
                <div className="flex gap-2 mb-2">{renderSeatRow("I")}</div>
                <div className="flex gap-2">{renderSeatRow("J")}</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Proceed Button */}
      <div className=" flex justify-center text-center mt-8">
        <button
          onClick={()=>navigate('/my-bookings')}
          className="bg-[#ff3b5c] hover:bg-[#e72b4d] text-white px-8 py-3 rounded-full text-lg transition-all duration-300"
        >
          Proceed to Checkout →
        </button>
      </div>
    </div>
  );
};

export default SeatLayout;
