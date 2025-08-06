// pages/Movies.jsx
import { dummyShowsData } from "../assets/assets";
import MovieCard from "../components/MovieCard";

const Favorite = () => {
  return  dummyShowsData.length > 0? (
    <div className="p-6 bg-black min-h-screen mt-20 ">
      <h1 className="text-3xl font-bold text-white mb-6">Your Favorite Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dummyShowsData.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}

      </div>
    </div>
  ): 
    (
      <div>
        <h1 className="text-3xl text-center font-bold text-white mb-6">No movies Available</h1>
      </div>
      
    )

};

export default Favorite;
