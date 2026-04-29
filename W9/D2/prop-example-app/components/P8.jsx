// Props immutable

// Notification count
function Child({message}){
    // message="Changed message"
    return <p>Received message: {message}</p>
}

export function PropsImmutabilty(){
    const parentMessage="Props are ready-only";
    return(
       <>
        <h2>Props are Immutable</h2>
        <Child message={parentMessage}/>
       </> 
    )
}