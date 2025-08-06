import React from "react";
import MovieCard from "./MovieCard";
import { useNavigate } from "react-router-dom";
import { dummyShowsData } from "../assets/assets";

const NowShowingSection = ({ movies }) => {
  const navigate = useNavigate();

  return (
    <section className="px-6 md:px-12 lg:px-20 py-12 bg-[#0f0f12]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-white text-2xl font-semibold">Now Showing</h2>
        <button
          onClick={() => navigate("/movies")}
          className="text-white text-sm hover:underline flex items-center gap-1"
        >
          View All <span className="text-xl">→</span>
        </button>
      </div>

      {/* Movie Cards */}
      <div className="flex flex-wrap justify-center gap-8">
        {dummyShowsData && dummyShowsData.length > 0 ? (
          dummyShowsData.slice(0, 4).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p className="text-white">No movies found</p>
        )}
      </div>

     
    </section>
  );
};

export default NowShowingSection;
