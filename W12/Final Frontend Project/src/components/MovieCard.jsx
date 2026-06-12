export default function MovieCard(props){
    // const movie = {
    //     title : "Obsession",
    //     genre: "Sci-Fi",
    //     rating: "9",
    //     duartion : "2h 15m"
    // };
    return(
        <div>
            <img src={props.poster} alt={props.title} />
            <h3>{props.title}</h3>
            <p>Genre: {props.genre}</p>
            <p>Rating: {props.rating}</p>
            <p>Duration: {props.duration}</p>
            <button>Book Now</button>
        </div>
    );
}