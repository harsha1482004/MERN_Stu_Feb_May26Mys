import { PropTypes } from "prop-types";
// Prop Validation
function Profile({name,age}){
    return(
        <div className="card">
            <p>{name}</p>
            <p>{age}</p>
        </div>
    );
}

Profile.propTypes={
    name:PropTypes.string.isRequired,
    age:PropTypes.number.isRequired,
}

export function PropTypesDemo(){
    return(
        <>
            <Profile name="Harsha" age={21}/>
        </>
    );
}