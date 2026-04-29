// Props destructuring
// A syntax of ES6 approach that allows as to unpack properties from prop object directly into its values
import React from "react";

// Child Component
function UserProfile({userName,skill}){
    return(
        <div>
            <p>User: {userName}</p>
            <p>Skill: {skill}</p>
        </div>
    )
}

// Parent component
export function PropDestructuring(){
    return(
        <>
            <h2>Props Destructuring</h2>
            <UserProfile userName={"Harsha"} skill={"React"}/>
        </>
    )
}