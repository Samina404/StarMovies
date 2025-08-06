import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, CalendarDays, ArrowRight } from 'lucide-react';


const HeroSection = () => {
  return (
    <section
      className="bg-hero-pattern bg-cover bg-center text-white min-h-screen flex items-center px-6 md:px-16"
      style={{
        backgroundImage: `url('/backgroundImage.png')`, // use your image here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className=" bg-opacity-60 p-8 rounded-xl max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
      Guardians<br>
      </br>
       of the Galaxy
        </h1>
       <p className="text-lg text-gray-300 mb-4 flex items-center gap-2">
  <Clock className="w-5 h-5 text-red-500" />
  Duration: <span className="font-semibold text-white">2h 43min</span>
</p>

<p className="text-lg text-gray-300 mb-8 flex items-center gap-2">
  <CalendarDays className="w-5 h-5 text-yellow-400" />
  Released: <span className="font-semibold text-white">July 14, 2025</span>
</p>
        <p className="text-lg text-gray-300 mb-4 flex items-center gap-2" >In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people meet in London and try to stop a conspiracy.</p>
        <Link to="/movies">
          <button className="bg-red-600 hover:bg-primary-dull flex items-center cursor-pointer transition-all px-6 py-3 rounded-full text-white font-semibold text-sm ">
          Explore Movies
          <ArrowRight className='w-5 h-5' />
          </button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
