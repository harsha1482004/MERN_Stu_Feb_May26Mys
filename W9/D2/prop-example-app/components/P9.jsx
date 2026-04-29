// Props vs store
// Props: data passed from parent to child component
// Data comes from outside the component 
// *are read only
// *are used for passing inside a component

// State: data managed inside a component
// belongs to the component itself
// can be modified/changed

import { useState } from "react";

function Child({title}) {
    return <p>Props: {title}</p>
}
export function PropsState(){
    const [stateValue, setStateValue] = useState('Local State');
    return (
        <>
           <h3>Props vs State</h3>
           <Child title="Parent data" />

            <p>State: {stateValue}</p><br />
           <button onClick={()=>setStateValue('This is new state.')}>
                Update State
           </button>
        </>
    )
}