import { useState } from "react";
export default function CitySelector(){
    const [city,setCity] = useState("Mysuru");
    return (
      <section>
        <h2>Selected City</h2>
        <p>City</p>
        <button
          onClick={() => {
            setCity("Mandya");
          }}
        >
          Mandya
        </button>
        <button
          onClick={() => {
            setCity("Banglore");
          }}
        >
          Banglore
        </button>
      </section>
    );
}