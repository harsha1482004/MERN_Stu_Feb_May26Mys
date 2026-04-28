import React from "react";

function Welcome(props){
    // Child component : reusable UI
    return(
        <p>Hello.{props.name}</p>
    )
}

export function FunctionalComponentBasics(){
    return(
        <div>
            <h2>Functional Component Basics</h2>
            {/* We are passing "Harsha" as prop
            Welcome() receives is as {name:"Harsha"} */}
            <Welcome name="Harsha"/>
            {/* We are passing "Developer" as prop
            Welcome() receives is as {name:"Developer"} */}
            <Welcome name="Developer"/>
        </div>
    )
}