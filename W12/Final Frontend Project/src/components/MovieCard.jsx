export default function MovieCard(){
    const movie = {
        title : "Obsession",
        genre: "Sci-Fi",
        rating: "9",
        duartion : "2h 15m"
    };
    return(
        <div className="movie-card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGDRFRG0ilmD765LF2UX1x81ttuw3Tswmq3Y59UmHtMrEBp_ClQJGPBgAk97jOe4AwMYpd-rc7IRMdwoUmdJsUvUsosqH8UeYVT1hjoxWmng&s=10" alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>Genre: {movie.genre}</p>
            <p>Rating: {movie.rating}</p>
            <p>Duration: {movie.duartion}</p>
            <button>Book Now</button>
        </div>
    )
}