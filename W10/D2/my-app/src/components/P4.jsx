// useReducer hook
// A managing state with reducer function
// Helps keep update logic in one place

import { useReducer } from "react"

// Where to use?
// Forms
// Shopping carts
// Counters with multiple actions
// Games

// How it works
// 1.we define a reducer(state, action)
// 2.we call useReducer(reducer, initialState)
// 3.we dispatch actions
// e.g: dispatch({type:'increment'})

// initial state object
const initialState = {
    count: 0
};

// Reducer function
// current state
// action object

// it must return the next state

function reducer(state, action) {
    switch (action.type) {

        case 'increment':
            return { ...state, count: state.count + 1 };

        case 'decrement':
            return { ...state, count: state.count - 1 };

        case 'reset':
            return initialState;

        case 'incrementByAmount':
            return { ...state, count: state.count + action.payload };

        default:
            return state;
    }
}

export function UserReducerIntro() {

    // return
    // state: current state object
    // dispatch: function to send actions to reducer

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <section>

            <h2>useReducer intro</h2>

            {/* ERROR FIXED HERE */}
            <p>Count: {state.count}</p>

            <button onClick={() => dispatch({ type: 'decrement' })}>
                -1
            </button>

            <button onClick={() => dispatch({ type: 'increment' })}>
                +1
            </button>

            <button
                onClick={() =>
                    dispatch({
                        type: 'incrementByAmount',
                        payload: 5
                    })
                }
            >
                +5
            </button>

            <button onClick={() => dispatch({ type: 'reset' })}>
                Reset
            </button>

        </section>
    )
}