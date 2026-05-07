// Synthetic event vs Native DOM events

// Synthetic events: A wrapper created by React around the browser's native event
// Gives a consistent API across browsers
// Works similarly to native DOM events
// Still allows access to the original browser events via event.nativeEvent

// Why does React use it?
// To make event handling behave consistently
// To simplify cross-browser differences
// To integrate smoothly with React's event system

// How Synthetic events works?
// Component renders: 
// * A button appears on the screen
// * handleClick is defined but it is not executed

// user clicks the button
    // Browser creates a native click event
    // React wraps that native event in a synthetic event
    // React passes the SyntheticEvent to handleClick

    // event refers to the SyntheticEvent
    // event.target gives us the HTML elements

