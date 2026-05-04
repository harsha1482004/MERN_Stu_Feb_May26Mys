// Updating objects & Arrays
import { useState } from "react";

export function UpdatingObjectsArraysState(){
    // user state
    const [user,setUser]=useState({
        name:"Harsha",
        skill:"Developer"
    });

    const updateSkill=()=>{
        setUser({
            ...user,  // Copies all existing properties(name,skill)
            skill:"Advanced React"
        })
    };
    return(
        <>
            <h2>Updating objects</h2>
            <p>{user.name} - {user.skill}</p>
            <button onClick={updateSkill}>Update Skill</button>
        </>
    )
}