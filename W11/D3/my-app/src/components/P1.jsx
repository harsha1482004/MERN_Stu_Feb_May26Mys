// Managing Api state with useEffect

import { useState,useEffect } from "react";

export function ManagingApiState(){
    // user state: stores the list of users fetched from the API
    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(false);  // true while data is being fetched

    const [error, setError] = useState("");  // stores any error message that occurs during the API call

    // The following function accepts "signal" so the request can be cancelled by AbortController during cleanup
    async function loadUsers(signal){
        setLoading(true);
        setError("");
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users", { signal });

            if (!response.ok) {
                throw new Error(`Failed with status ${response.status}`);
            }
            const data = await response.json();
            setUsers(data);
        }
        catch (err) {
            if (err.name === "AbortError") {
                return;
            }
            console.error(error);
            setError(error.message || "Failed to fetch users");
        }
        finally {
            setLoading(false);
        }
    }
    
    // What happens in useEffect?
        // 1.Create an AbortController.
        // 2.Start the API request.
        // 3.Return a cleanup function that aborts the request if the component unmounts before the request completes.
    useEffect(() =>{
        const controller = new AbortController();
        loadUsers(controller.signal);
        return () => {
            controller.abort();
        };
    },[]);

    // Reload function: allows users to manually trigger the API request again by clicking a button
    function handleReload() {
        const controller = new AbortController();
        loadUsers(controller.signal);
    }
    return(
        <section>
            <h2>Managing API State with useEffect</h2>
            <button onClick={handleReload} disabled={loading}>
                {loading ? "Loading..." : "Reload Users"}
            </button>

            {/* Loading UI */}
            {loading && <p>Loading users...</p>}

            {/* Error UI */}
            {!loading && error && <p>Error: {error}</p>}

            {/* Empty State UI */}
            {!loading && !error && users.length === 0 && <p>No users found.</p>}

            {/* Success UI */}
            {!loading && !error && users.length > 0 && 
                users.map((user) => (
                        <article key={user.id}>
                            <h4>{user.name}</h4>
                            <p>Email: {user.email}</p>
                            <p>Company: {user.company?.name}</p>
                            <p>City: {user.address?.city}</p>
                        </article>
                )) 
            }
        </section>
    );
}