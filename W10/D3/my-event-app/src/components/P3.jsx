import { useState } from "react";

// Passing arguments to event handlers
export function PassingArguments(){
    const [message,setMessage]=useState('No msg yet');
    // Event handler function
    const handleClick=(msg)=>{
        setMessage(msg);
    };
    
    return(
        <section>
            <h2>Passing Arguments</h2>
            <button onClick={()=>handleClick("Namaste")}>
            {/* onClick={handleClick("Namaste") wrong*/}
                Click me
            </button>
            <p>Message: {message}</p>
        </section>
    )
}