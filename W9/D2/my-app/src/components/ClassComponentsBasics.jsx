import React, { Component } from "react";

export class ClassComponentsBasics extends Component{
    // 1.Class extends React.Component
    // state,lifecycle methods,props,setState()

    render(){
        // render(): Returns JSX describing what to show called whenever components needs to update
        return(
            <>
                <h2>Class Components</h2>
                <p>Class Components use render() & support lifecycle methods.</p>
            </>
        )
    }
}