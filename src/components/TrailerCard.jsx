import React from "react";

const TrailerCard = ({ thumbnail, title }) => {
  return (
    <div className="min-w-[200px] mr-4 cursor-pointer hover:scale-105 transition">
      <div className="relative">
        <img src={thumbnail} alt={title} className="rounded-md" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <p className="text-white mt-2 text-sm">{title}</p>
    </div>
  );
};

export default TrailerCard;
