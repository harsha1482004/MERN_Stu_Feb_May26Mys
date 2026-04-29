// Passing Objects and Arrays as props
function UserCard({user}){
    return(
        <div className="card">
            <p>Name: {user.name}</p>
            <p>Role: {user.role}</p>
        </div>
    )
}

function SkillsList({skills}){
    return(
        <ul>
            {skills.map((skill)=>(
                <li key={skill}>{skill}</li>
            ))}
        </ul>
    )
}

export function ObjectsAndArrayProps(){
    const user={
        name:"Harsha",
        role:"Developer"
    };
    const skills=['React','Tailwind','vite'];
    return(
        <>
            <h2>Passing arrays and objects as props</h2>
            <UserCard user={user}/>
            <SkillsList skills={skills}/>
        </>
    )
}