// Container/wrapper component
import React from "react";

// Children is a special React prop 
// It holds nested JSX passed b/w component tags
// It helps create reusable wrapper/layout components
function Container({children}){
    return(
        <div className="card">
            {children}
        </div>
    )
}

// Parent component 
export function PropsChildren(){
    return(
        <>
            <Container>     {/* Function name defined in the Child class */}
                <div className="box">
                    <h3>First child element in nested approach</h3>
                </div>   
            </Container>
        </>
    )
}