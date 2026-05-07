// Basics events in React
// What is an event?
// An action triggerd by the User(mouse,keyboard,DOM).
// Raect uses camelCase attributes like onClick, onChange...
// React passes an event object(Synthetic event) to the handler

export function EventBasics(){
    // Declaring a event handler function
    const handleClick=()=>alert("Clicked");

    return(
        <section>
            <h2>Basic Events</h2>
            {/* Event binding */}
            <button onClick={handleClick}>
                Click me
            </button>
        </section>
    )
}