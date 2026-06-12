import { useState } from "react";

export default function LoginForm() {
    const [email,setEmail]= useState("")
    function handleSumbit(event){
        event.preventDefault();
        alert(`login: ${email}`)
    }
    return(
        <section>
            <h2>Login</h2>
            <form onSubmit={handleSumbit}>
                <input type="email" placeholder="Enter email" value={email}
                onChange={(event)=>{
                    setEmail(event.target.value);
                }}/>
                <button>Login</button>
            </form>
        </section>
    )
}