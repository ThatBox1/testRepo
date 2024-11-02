import { useState, useEffect } from 'react';
import './App.css';
import YouTube from 'react-youtube';


// Need to connect to youtube still


// const API_KEY = process.env.REACT_APP_API_KEY;
const popularMovieURL = `https://api.themoviedb.org/3/movie/popular?api_key=71cddf6870c281a657d0e74de3e4c478`;
const upcomingMovieURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=71cddf6870c281a657d0e74de3e4c478`;
const topRatedMovieURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=71cddf6870c281a657d0e74de3e4c478`;

function App() {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    // console.log("API Key:" + `${process.env.REACT_APP_API_KEY}`);
    try {
      const response = await fetch(popularMovieURL);
      const responseJSON = await response.json(); 
      console.log(responseJSON, ': this is the json info');
      setMovies(responseJSON.results); 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const getVideos = () => {
    return 0;
  }

  return (
    <div>
      {movies.map((data) => (
        <div className='movies' key={data.id}>
          <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.title} />
          <p>{data.title}</p>
          <YouTube videoId=''/>
        </div>
      ))}
    </div>
  );
}

export default App;
