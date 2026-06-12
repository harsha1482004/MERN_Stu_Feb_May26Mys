import "./App.css";
import GenreFilter from "./components/GenreFilter";
import LoginForm from "./components/LoginForm";
import SearchShortcut from "./components/SearchShortcut";

function App() {
  return (
    // Component Composition
    <>
      <GenreFilter/>
      <LoginForm/>
      <SearchShortcut/>
    </>
  );
}

export default App;
