import { useState, useEffect } from 'react';

import MovieCard from './MovieCard';
import SearchIcon from './search.svg';
import './App.css';

const API_URL = 'http://www.omdbapi.com?apikey=97279f7f';

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setsearchTerm] = useState('');

    const searchMovies = async (title) => {
        // async: pages takes some time to load data
        const response = await fetch(`${API_URL}&s=${title}`);
        // 's': a search query within API endpoint (api url)
        const data = await response.json();

        setMovies(data.Search);
        // .Search: a property which returns the desired result (in this case array of jsons) from data object
    }
    
    useEffect(() => {
        searchMovies('Spiderman'); // initial presentation of webpage
    }, []);

    return (
        <div className ="app"> {/* HTML class in javascript where the class is coded in css file */}
            <h1>MovieLand</h1>

            <div className="search">
                <input
                    placeholder="Search for movies"

                    // recall API
                    value={searchTerm}
                    // callback func: waits for some cmd {() => {}}
                    onChange={(e) => setsearchTerm(e.target.value)}
                    // (parameter) => {
                    // Function logic
                    // }
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    // call API
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0
                ?(
                    <div className="container">
                        {movies.map((movie) => ( 
                            // map dynamically loops over movies arr (fetched from api)
                            <MovieCard movie = {movie}/>
                        ))}
                    </div>
                )   :   (
                    <div className = "empty">
                        <h2>No movies found</h2>
                    </div>
                )}            
        </div>
    );
}

export default App;