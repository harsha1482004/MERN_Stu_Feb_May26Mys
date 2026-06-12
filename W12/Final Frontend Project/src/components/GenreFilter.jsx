import { useState } from "react";

export default function GenreFilter(){
    const [genre,setGenre]= useState("All");
    function selectGenre(selectGenre){
        setGenre(selectGenre);
    }
    return (
      <section>
        <h3>Genre Filter</h3>
        <p>Selected Genre: {genre}</p>
        <button
          onClick={() => {
            selectGenre("Action");
          }}
        >
          Action
        </button>
        <button
          onClick={() => {
            selectGenre("Comedy");
          }}
        >
          Comedy
        </button>
        <button
          onClick={() => {
            selectGenre("Horrer");
          }}
        >
          Horrer
        </button>
        <button
          onClick={() => {
            selectGenre("Romantic");
          }}
        >
          Romantic
        </button>
      </section>
    );
}