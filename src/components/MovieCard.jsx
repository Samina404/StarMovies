import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  // Convert runtime to "Xh Ym" format
  const formatDuration = (minutes) => {
    if (!minutes) return "";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  return (
    <div
      onClick={() => navigate(`/movies/${movie.id}`)}
      className="bg-[#1f2937] w-[260px] rounded-2xl overflow-hidden shadow-md cursor-pointer hover:scale-95 transition-transform duration-300"
    >
      {/* Poster */}
      <img
        src={movie.poster_path}
        alt={movie.title}
        className="w-full h-64 object-cover rounded-t-2xl"
      />

      {/* Content */}
      <div className="px-4 py-3 text-white">
        {/* Title */}
        <h3 className="text-base font-semibold truncate mb-1">{movie.title}</h3>

        {/* Year • Genre • Duration */}
        <p className="text-sm text-gray-400 mb-4">
          {movie.release_date?.slice(0, 4)} •{" "}
          {Array.isArray(movie.genres)
            ? movie.genres.map((g) => g.name || g).join(" | ")
            : ""}
          {" • "}
          {formatDuration(movie.runtime)}
        </p>

        {/* Bottom: Buy Button + Rating */}
        <div className="flex items-center justify-between">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click
              navigate(`/movies/${movie.id}#selectDate`);
            }}
            className="bg-primary hover:bg-[#e11d48] text-white text-xs px-4 py-2 rounded-full font-medium"
          >
            Buy Tickets
          </button>

          <div className="flex items-center gap-1 text-yellow-300 font-medium text-sm">
            <FaStar className="text-base" />
            {movie.vote_average?.toFixed(1) || "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
