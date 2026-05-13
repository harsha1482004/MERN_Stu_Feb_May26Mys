import {useParams} from "react-router-dom"

export function MultipleDynamicParmas(){
    const {userId,orderId} =useParams();
    return(
       <div>
            <h2>Multiple Dynamic Parameters</h2>
            <p>User ID from URL: {userId}</p>
            <p>Order ID from URL: {orderId}</p>
       </div> 
    )
}