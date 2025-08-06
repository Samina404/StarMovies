import React from "react";
import { dummyBookingData } from "../assets/assets";
import moment from "moment";

const MyBookings = () => {
  return (
    <div className="min-h-screen  bg-black text-white py-10 mt-20 ml-20 w-200 px-15">
      <h2 className="text-2xl font-semibold mb-6">My Bookings</h2>

      <div className="space-y-5">
        {dummyBookingData.map((booking, index) => {
          const { show, amount, bookedSeats, isPaid } = booking;
          const { movie, showDateTime } = show;

          return (
            <div
              key={index}
              className="flex items-center justify-between bg-gradient-to-r from-[#241e2b] to-[#131313] rounded-lg p-4 shadow-md"
            >
              {/* Poster */}
              <div className="w-30 h-35 rounded-md overflow-hidden border border-[#333]">
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 px-5">
                <h3 className="text-xl font-bold">{movie.title}</h3>
                <p className="text-sm text-gray-400 mt-1">
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </p>
                <p className="text-sm text-gray-300 mt-1">
                  {moment(showDateTime).format("dddd, MMMM Do [at] h:mm A")}
                </p>
              </div>

              {/* Payment & Seats */}
              <div className="text-right">
                <p className="text-lg font-bold">৳{amount}</p>
                {!isPaid ? (
                  <button className="mt-2 bg-primary hover:bg-green-400 text-white py-1 px-3 rounded-full text-sm font-semibold">
                    Pay Now
                  </button>
                ) : (
                  <p className="mt-2 text-green-500 font-medium text-sm">Paid</p>
                )}
                <p className="text-sm mt-4 text-gray-400">
                  Total Tickets: <span className="font-semibold text-white">{bookedSeats.length}</span>
                </p>
                <p className="text-sm text-gray-400">
                  Seat Number:{" "}
                  <span className="font-semibold text-white">{bookedSeats.join(", ")}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyBookings;
