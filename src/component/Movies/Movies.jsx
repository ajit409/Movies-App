import React, { useEffect, useState } from "react";
import axios from "axios";
import './Movies.css';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getMovies();
    }, [searchTerm]);

    async function getMovies() {
        const movieName = searchTerm;
        try {
            const res = await axios.get(`http://www.omdbapi.com/?apikey=9588f996&s=${movieName}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = res.data;
            console.log(data);

            if (Array.isArray(data.Search)) { // Check if data.Search is an array
                setMovies(data.Search);
            } else {
                console.error("Unexpected data format:", data);
                setMovies([]); // Safely reset to an empty array
            }
        } catch (error) {
            console.error("Failed to fetch movies:", error);
            setMovies([]); // Safely reset to an empty array
        }
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="home">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            {
                movies.map((el, index) => (
                    <div className="card" key={index || el.imdbID}>
                        <img src={el.Poster} alt={el.Title} />
                        <h3 className="title">{el.Title}</h3>
                    </div>
                ))
            }
        </div>

    );
};

export default Movies;


