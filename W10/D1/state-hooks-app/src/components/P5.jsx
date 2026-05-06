// useEffect for side effects
// Side Effects: the things your coponent does outside of rendering UI.
// EX: Fetching data from an API or Updating the DOM manually or setting up subscriptions(websockets).

import { useState,useEffect } from "react";
export function UseEffectBasics(){
    const [count,setCount]=useState(0);
    const [name,setName]=useState('Guest');

    useEffect(()=>{
        console.log('useEffects runs once');
        document.title=`React useEffect example - welcome $(name)`;

        return () =>{
            document.title= 'React useEffect';
        };
    },[]);

    // DOM updation based on state
    useEffect(()=>{
        console.log(`Count changed to ${count}`);
    },[count]);

    // No dependency array
    useEffect(()=>{
        console.log('Runs after every render');
    });

    const increment =()=> setCount(count+1);
    const updateName=(e)=>setName(e.target.value);

    return(
        <>
            <input value={name} onChange={updateName} placeholder="Enter Your Name"/>
            <button onClick={increment}>Count: {count}</button>
            {`useEffect(()=>{
                console.log('Runs once');
            },[]);`}
        </>
    )
    
}