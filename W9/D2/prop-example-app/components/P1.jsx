import React from "react";

// Props basics
function WelcomeCard(props){
    return(
        <div className="card">
            <h2>Hello, {props.name}</h2>
            <p>Role:{props.role}</p>
        </div>
    )
}

// Parent Component
export function PropBasics(){
    return(
        <>
            <WelcomeCard name="Harsha" role="React Developer"/>
            <WelcomeCard name="Developer" role="UI Developer"/>
        </>
    )
}