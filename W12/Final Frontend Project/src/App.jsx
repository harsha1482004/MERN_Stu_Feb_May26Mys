import "./App.css";
import CitySelector from "./components/CitySelector";
import MovieSearch from "./components/MovieSearch";

function App() {
  return (
    // Component Composition
    <>
      <CitySelector/>
      {/* Controlled Component */}
      <MovieSearch/>
    </>
  );
}

export default App;
