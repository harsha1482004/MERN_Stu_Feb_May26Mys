import { useState } from "react";

export default function MovieResults(){
    const [movies,setMovies] = useState([]);

    return(
        <section>
            <h2>Search Results</h2>
            {movies.length===0 ? <p>Movies not found</p> : 
            <ul>
                {movies.map((movie)=>(<li key={movie}>{movie}</li>))}    
            </ul>}
            <button onClick={()=>{
                setMovies(["Inception", "Dhurandar", "Obsession"])
            }}>Load Movies</button>
        </section>
    )
}