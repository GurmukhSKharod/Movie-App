import {useEffect, useState } from 'react';

import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from './search.svg';

//5a74a332
const API_URL = 'http://www.omdbapi.com?apikey=5a74a332'

const App = () => {

    //user looks up different movies, so different state
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);

    //fetch movies by title
    const searchMovies = async (title) => {
        //call api
        const response = await fetch(`${API_URL}&s=${title}`);
        //get api response
        const data = await response.json();

        setMovies(data.Search); //array of movies
    }

    //called at start
    useEffect(() => {
        searchMovies('Batman');
    }, []); 

    // using '{ }' to make dynamic code on a movie state change. Dynamically loop over movies array, fetched from and API, then passing each movie as a prop to MovieCard. 
    return (
        <div className="app">
            <h1>Movie App</h1>

            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e)=> setSearchTerm(e.target.value)}
                />
                <img 
                    src={SearchIcon}
                    alt="search"
                    onClick={()=> searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0 
                ? (
                    <div className="container">
                        {movies.map((movie)=> (
                            <MovieCard movie={movie}/>
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                ) 
            }

            
        </div>
    );
}

export default App;