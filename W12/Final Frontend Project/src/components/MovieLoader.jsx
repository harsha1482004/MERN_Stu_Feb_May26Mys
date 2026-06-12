import { useState } from "react";

export default function MovieLoader(){
    const [isloading,setIsLoading]= useState(true);

    return(
        <section>
            <h2>Movies</h2>
            {isloading ? <p> Loading Movies... </p> : <p>Movie Loaded Successfully</p>}
            <button onClick={()=>{
                setIsLoading(!isloading);
            }}>Toggle Loading</button>
        </section>
    )
}