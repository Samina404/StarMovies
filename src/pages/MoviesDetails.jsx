import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dummyShowsData } from "../assets/assets";
import { StarIcon } from "lucide-react";
import Loading from "./Loading";
import timeFormat from "../lib/timeFormat";

// Utility: get next 7 days
const getNext7Days = () => {
  const dates = [];
  const options = { day: "2-digit", month: "short" };
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    dates.push({
      label: d.toLocaleDateString("en-US", options),
      full: d.toISOString().split("T")[0],
    });
  }
  return dates;
};

const timeSlots = ["12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"];

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const bookRef = useRef();

  useEffect(() => {
    const selectedMovie = dummyShowsData.find((m) => m.id.toString() === id);
    setMovie(selectedMovie);
    setSelectedDate(null);
    setSelectedTime(null);
  }, [id]);

  const handleBuyTickets = () => {
    bookRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleWatchTrailer = () => {
    const query = encodeURIComponent(`${movie.title} trailer`);
    window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank");
  };

  if (!movie) return <Loading/>;

  const availableDates = getNext7Days();

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white px-6 md:px-16 lg:px-40 py-12 mt-20">
      {/* Movie Header */}
      <div className="flex flex-col md:flex-row gap-10 items-start max-w-6xl mx-auto">
        {/* Poster */}
        <div className="w-full md:w-[240px]">
          <img
            src={movie.poster_path}
            alt={movie.title}
            className="rounded-lg shadow-lg object-cover w-full"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4 w-full">
          <p className="text-pink-500 uppercase text-sm tracking-wider">
            {movie.original_language.toUpperCase()}
          </p>
          <h1 className="text-4xl font-bold">{movie.title}</h1>

          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <StarIcon className="w-5 h-5 text-pink-500 fill-pink-500" />
            <span>{movie.vote_average.toFixed(1)} User Rating</span>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed">{movie.overview}</p>

          <p className="text-sm text-gray-500">
            {timeFormat(movie.runtime)}• {movie.genres.map((g) => g.name).join(", ")} •{" "}
            {movie.release_date.split("-")[0]}
          </p>

          {movie.tagline && (
            <p className="italic text-pink-300 mt-2 text-sm">"{movie.tagline}"</p>
          )}

          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={handleWatchTrailer}
              className="bg-[#232636] hover:bg-[#303344] text-white px-6 py-2 rounded-md transition"
            >
              ▶ Watch Trailer
            </button>
            <button
              onClick={handleBuyTickets}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-md transition"
            >
              🎟 Buy Tickets
            </button>
            <button className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-md text-white">
              ♥
            </button>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      {movie.casts && (
  <div className="mt-12 max-w-6xl mx-auto">
    <h2 className="text-white text-xl mb-4 font-semibold">Your Favorite Cast</h2>
    <div className="flex gap-6 overflow-x-auto pb-4">
      {movie.casts.slice(0, 12).map((actor, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center text-center min-w-[80px] hover:scale-105 transition-transform duration-300"
        >
          <img
            src={actor.profile_path}
            alt={actor.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-400 shadow-md"
          />
          <span className="text-sm text-gray-300 mt-2 text-center line-clamp-1">
            {actor.name}
          </span>
        </div>
      ))}
    </div>
  </div>
)}


      {/* Booking Section */}
      <div
        ref={bookRef}
        className="mt-20 bg-[#1b1116] rounded-xl p-8 border border-pink-600"
      >
        <h2 className="text-white text-lg font-semibold mb-6">Choose Date & Time</h2>

        {/* Dates */}
        <div className="flex flex-wrap gap-4 mb-6">
          {availableDates.map((date) => (
            <button
              key={date.full}
              onClick={() => {
                setSelectedDate(date.full);
                setSelectedTime(null);
              }}
              className={`px-4 py-2 rounded-md border ${
                selectedDate === date.full
                  ? "bg-pink-600 border-pink-600 text-white"
                  : "border-gray-600 text-gray-300 hover:border-pink-400"
              }`}
            >
              {date.label}
            </button>
          ))}
        </div>

        {/* Time Slots */}
        {selectedDate && (
          <>
            <h3 className="text-white mb-3 text-sm">Available Times</h3>
            <div className="flex gap-4 flex-wrap mb-6">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  className={`px-4 py-2 rounded-md border ${
                    selectedTime === slot
                      ? "bg-pink-500 border-pink-500 text-white"
                      : "border-gray-600 text-gray-300 hover:border-pink-400"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Book Now */}
        <button
  disabled={!selectedDate || !selectedTime}
  onClick={() => navigate(`/movies/${id}/${selectedDate}`)}
  className={`bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-md text-white transition ${
    !selectedDate || !selectedTime ? "opacity-50 cursor-not-allowed" : ""
  }`}
>
  Book Now
</button>

      </div>

      {/* Related Movies */}
      <div className="mt-20 max-w-6xl mx-auto">
        <h2 className="text-white text-lg font-semibold mb-4">You May Also Like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {dummyShowsData
            .filter((m) => m.id !== movie.id)
            .slice(0, 4)
            .map((m) => (
              <div
                key={m.id}
                onClick={() => navigate(`/movies/${m.id}`)}
                className="bg-[#232636] rounded-xl p-3 hover:scale-105 transition cursor-pointer"
              >
                <img
                  src={m.poster_path}
                  alt={m.title}
                  className="w-full h-48 object-cover rounded-md mb-2"
                />
                <h3 className="text-white text-sm font-medium truncate">{m.title}</h3>
                <p className="text-xs text-gray-400">
                  {m.release_date.split("-")[0]} • {m.genres.map((g) => g.name).join(" | ")} •{" "}
                  {m.runtime}m
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
