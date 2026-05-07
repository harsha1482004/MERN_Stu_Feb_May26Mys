// useCallback with event handlers

import { useState, useCallback, memo } from "react";


const ChildButton = memo(function ChildButton({ onClick }) {
    console.log("ChildButton rendered");

    return (
        <button onClick={onClick}>
            Increment Count
        </button>
    );
});

export function UseCallbackEvents() {

    const [count, setCount] = useState(0);

    
    const handleClick = useCallback(() => {
        setCount((prevCount) => prevCount + 1);
    }, []);

    return (
        <div>
            <h2>useCallback in events example</h2>
            <p>Count: {count}</p>

            <ChildButton onClick={handleClick} />
        </div>
    );
}