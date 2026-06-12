import "./App.css";
import GenreFilter from "./components/GenreFilter";
import LoginForm from "./components/LoginForm";
import SearchShortcut from "./components/SearchShortcut";
import AuthStatus from "./components/AuthStatus";
import MovieLoader from "./components/MovieLoader";
import MovieResults from "./components/MovieResults";

function App() {
  return (
    // Component Composition
    <>
      {/* <GenreFilter/>
      <LoginForm/>
      <SearchShortcut/>
      <AuthStatus/> */}
      <MovieLoader/>
      <MovieResults/>
    </>
  );
}

export default App;
