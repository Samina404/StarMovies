import { Radius } from 'lucide-react';
import React, { useState } from 'react';

const trailers = [
  {
    id: 1,
    title: "Inception",
    thumbnail: "https://img.youtube.com/vi/YoHD9XEInc0/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/YoHD9XEInc0",
  },
  {
    id: 2,
    title: "Spider-Man: No Way Home",
    thumbnail: "https://img.youtube.com/vi/JfVOs4VSpmA/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/JfVOs4VSpmA",
  },
  {
    id: 3,
    title: "Avengers: Endgame",
    thumbnail: "https://img.youtube.com/vi/TcMBFSGVi1c/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/TcMBFSGVi1c",
  },
];

const TrailerSection = () => {
  const [selectedTrailer, setSelectedTrailer] = useState(trailers[0]);

  return (
    <section style={{ padding: '20px', textAlign: 'center' }}>
      <h1 className='text-3xl  text-primary ' style={{ marginBottom: '20px' }}>Watch Trailer</h1>

      {/* Main Trailer Player */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '960px',
        margin: '0 auto',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      }}>
        <iframe
          width="100%"
          height="540"
          src={selectedTrailer.videoUrl}
          title={selectedTrailer.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Thumbnail Trailers */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '30px',
        flexWrap: 'wrap',
      }}>
        {trailers.map((trailer) => (
          <div
            key={trailer.id}
            onClick={() => setSelectedTrailer(trailer)}
            style={{
              width: '200px',
              cursor: 'pointer',
              border: selectedTrailer.id === trailer.id ? '3px solid #007BFF' : '2px solid #ccc',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              transition: 'transform 0.3s, border 0.3s',
            }}
          >
            <img
              src={trailer.thumbnail}
              alt={trailer.title}
                style={{
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    
  }}
            />
            <p style={{
              margin: 0,
              padding: '10px',
              fontWeight: 'bold',
              background: '#f9f9f9',
            }}>
              {trailer.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrailerSection;
