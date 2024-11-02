import { useState, useEffect } from 'react';
import './App.css';
import YouTube from 'react-youtube';

const popularMovieURL = `https://api.themoviedb.org/3/movie/popular?api_key=71cddf6870c281a657d0e74de3e4c478`;

function App() {
  const [movies, setMovies] = useState([]);
  // Use an object to map movie IDs to their videos
  const [videos, setVideos] = useState({}); 

  const getMovies = async () => {
    try {
      const response = await fetch(popularMovieURL);
      const responseJSON = await response.json();
      setMovies(responseJSON.results);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch videos based on movie ID
  const getVideos = async (movieId) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=71cddf6870c281a657d0e74de3e4c478&language=en-US`);
      const responseJSON = await response.json();
      // Store videos in the state with the movie ID as the key
      setVideos((prevVideos) => ({
        ...prevVideos,
        [movieId]: responseJSON.results
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    // Fetch videos for each movie after movies are loaded
    if (movies.length > 0) {
      movies.forEach((movie) => {
        getVideos(movie.id);
      });
    }
  }, [movies]);

  return (
    <div>
      {movies.map((data) => (
        <div className='movies' key={data.id}>
          <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.title} />
          <p>{data.title}</p>
          {/* Get the videoId for the first video of this movie, if available */}
          {videos[data.id] && videos[data.id][0] ? (
            <YouTube videoId={videos[data.id][0].key} />
          ) : (
            <p>No video available</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
