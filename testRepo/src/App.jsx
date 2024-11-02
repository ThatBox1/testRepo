import { useState, useEffect } from 'react';
import './App.css';
import YouTube from 'react-youtube';



// const API_KEY = process.env.REACT_APP_API_KEY;
const popularMovieURL = `https://api.themoviedb.org/3/movie/popular?api_key=71cddf6870c281a657d0e74de3e4c478`;
const upcomingMovieURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=71cddf6870c281a657d0e74de3e4c478`;
const topRatedMovieURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=71cddf6870c281a657d0e74de3e4c478`;

function App() {
  const [movies, setMovies] = useState([]);
  const [videos, setVideos] = useState([]);

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

  // to get videos based on there specific id. will need a function to make a dynamic key to give to this function
  // for now i gave it the specific id of terrifier 3 which is: 1034541
  // will get the key from the id of each movie object
  // after the movie directory should be the id like this:/3/movie/movie_id/ 
  // replace movie_id with the id in the object 
  const getVideos = async () => {
    try {
      await fetch('https://api.themoviedb.org/3/movie/1034541/videos?api_key=71cddf6870c281a657d0e74de3e4c478&language=en-US')
      .then(res => res.json())
      .then(json => setVideos(json.results));

    } catch (error) {
      console.err(error);
    }
   

  }

  useEffect(() => {
    getMovies();
    getVideos();
  }, []);

  return (
    <div>
      {movies.map((data) => (
        <div className='movies' key={data.id}>
          <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.title} />
          <p>{data.title}</p>
          <YouTube videoId={videos[0]?.key}/>
        </div>
      ))}
    </div>
  );
}

export default App;
