import React, {useState} from "react";
// State Lifting: moving shared state upto the closest common parent
// We use this: Multiple child components need to share the same data
// Props drilling becomes too complex
// Child components need to update same data.

// 1st child component
function NameInput1({value,onChange}){
    return(
        <div>
            <label>Input 1:</label>
            <input value={value}
            onChange={(e)=>onChange(e.target.value)}
            placeholder="Type a name..." />
    
        </div>
    )
}
// 2nd child component
function NameInput2({value,onChange}){
    return(
        <div>
            <label>Input 2:</label>
            <input value={value} 
            onChange={(e)=>onChange(e.target.value)}
            placeholder="This gets Updated..." />
        </div>
    )
}

// Parent component
export function SharedStateParent(){
    const [name,setName]=useState('');
    return(
        <div>
            <h3>Shared state demo</h3>
            <NameInput1 value={name} onChange={setName}/>
            <NameInput2 value={name} onChange={setName}/>
            <div>
                <strong>Current Name:</strong>{name || 'Nothing typed yet'}
            </div>
        </div>
    )
}
