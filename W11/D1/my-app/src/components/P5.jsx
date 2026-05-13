// Nested Dynamic Routes : dynamic route inside another dynamic route

import {Link,Outlet,useParams} from "react-router-dom";

export function NestedDynamicRoutes(){
    const {courseId}=useParams();
    return(
        <div>
            <h2>Nested Dynamic Routes</h2>
            <p>Course ID: {courseId}</p>
            <nav>
                <Link to={`/${courseId}/modules/1`}>Module 1</Link> | {' '}
                <Link to={`/${courseId}/modules/2`}>Module 2</Link> | {' '}
            </nav>
            <hr />
            <Outlet />
        </div>
    );
}
