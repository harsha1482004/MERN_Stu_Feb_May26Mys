// Dynamic params with useParams hook
// Dynamic params are values that are taken from the URL.
// useParmas hook helps us read those values insode the component.
import {useParams} from "react-router-dom"

export function DynamicParamsUseParams(){
    const {id}=useParams();
    return(
        <div>
            <h2>Dyamic params with useParams</h2>
            <p>Prodoct Id from URL: {id}</p>
        </div>
    )
}

