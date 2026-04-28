import React from "react";
import { Component } from "react";

export class ClassComponentState extends Component{
    // Constructer: runs once when component is first created.
    constructor(props){
        super(props); // super() calls the parent construtor
        this.state={count:0};  // state is going to be here & stays even after the re-renders
    }

    // 2.Event handler: arrow function to handle 'this' binding...
    increment=()=>{
        this.setState((prevState)=>({
            count:prevState.count+1
        }));
    }

    // 3.Render: run whenever state/props change
    render(){
        return(
            <div>
                <h3>Class Component state</h3>
                <p>Count: {this.state.count}</p>
                <button onClick={this.increment}>Increment</button>
            </div>
        );
    }
}