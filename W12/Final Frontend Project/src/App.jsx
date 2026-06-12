import "./App.css";
import MovieCard from "./components/MovieCard";

function App() {
  return (
    // Component Composition
    <>
      <MovieCard
        title="Obsession"
        genre="Horrer"
        rating={9.1}
        duration="2h 15m"
        poster="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvloICMZ-iE2z_sI86gU38I6GOTNchx0sMolX42pHSztX0uiSoZIjZFRW_7sH9g2yc7AaNGTHrlR0LbgZq7vFSbiXN12kG31c07mfKSfnSkg&s=10"
      />
      <MovieCard
        title="Insecption"
        genre="Sci-Fic"
        rating={9.1}
        duration="2h 15m"
        poster="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQYG1_0TZ5emr5ZCazTyMyDo1iiyy0hVqiVcvTtXFaq2sTV2g0BcS09PHXt2kRQLvHu27cO2HA4IHFARYYkESFdPQTmHwjzYmz0K-w3Qs&s=10"
      />
      <MovieCard
        title="Paccha"
        genre="Comedy"
        rating={9.1}
        duration="2h 15m"
        poster="https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/medium/mango-pachcha-et00432829-1780562827.jpg"
      />
    </>
  );
}

export default App;
