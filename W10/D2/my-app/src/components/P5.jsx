// useCallback hook
// Memoizes a function
// it keeps the same function reference between renders until dependencies change

import { memo, useCallback, useState } from "react";

const ChildButton = memo(function ChildButton({ onClick, label }) {

    console.log(`${label} button rendered.`);

    return (
        <button onClick={onClick}>
            {label}
        </button>
    );
});

export function UseCallbackIntro() {

    const [count, setCount] = useState(0);
    const [theme, setTheme] = useState('light');

    const handleIncrement = useCallback(() => {
        setCount((prev) => prev + 1);
    }, []);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <section>

            <h2>useCallback Intro</h2>
            <p>Count: {count}</p>
            <p>Theme: {theme}</p>

            <ChildButton
                onClick={handleIncrement}
                label="Incre Count"
            />

            <button onClick={toggleTheme}>
                Toggle Theme
            </button>

        </section>
    );
}