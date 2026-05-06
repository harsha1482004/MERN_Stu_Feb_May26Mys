// useRef hooks: creates a mutable reference object
// The object has one property: current
// It persists across renders

import { useEffect, useRef, useState } from "react";

// Why do we use it?
// Direct DOM acess 
// Persisting values without triggering re-renders

export function UserRefIntro(){
    // 1. Reference : DOM : This will point to the input elemenet
    const inputRef=useRef(null);

    // 2.value reference: This stores the previous count value. changing it does not re-render the UI by itself
    const previousCountRef = useRef(0);
    const [count,setCount]=useState(0);
    const [text,setText]=useState('');

    useEffect(()=>{
        inputRef.current.focus();
    },[]);
    useEffect(()=>{
        previousCountRef.current=count;
    },[count]);

    const handleFocusInput=()=>{
        inputRef.current.focus();
    }

    const handleIncrement=()=>{
        setCount((prev)=>prev+1)
    };

    return(
        <section>
            <div>
                <h3>1. Focus Input using useRef</h3>
                <input type="text" value={text} ref={inputRef}
                onChange={(e)=>setText(e.target.value)} placeholder="Enter Something"/>
                <button onClick={handleFocusInput}>
                    Focus Input
                </button>
            </div>
            <div>
                <h2>Store previous value using UseRef</h2>
                <p>Current count: {count}</p>
                <p>Previous count: {previousCountRef.current}</p>
                <button onClick={handleIncrement}>Increment Count</button>
            </div>
        </section>
    )
}