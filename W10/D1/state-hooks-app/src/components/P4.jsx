import { useState } from "react";

// Derived state & conditional rendering
// Derived state is a value calculated from existing state.
// It is not usually stored seperately in state
// Instead, we compute it during rendering 

export function DerivedStateCondRender(){
    const [tasks,setTasks]=useState([
        {id:1, title:'Learn useState', completed:true},
        {id:2, title:'Practice JS', completed:false},
        {id:3, title:'Learn useContext', completed:false},
    ]);

    const toggleTask=(id)=>{
        setTasks(
            tasks.map((task)=>
            task.id===id ?{...task,completed: !task.completed} : task
            )
        );
    };

    // Derived State
    const totalTasks= tasks.length;
    const completedTasks=tasks.filter((task)=>task.completed).length;
    const pendingTasks=totalTasks-completedTasks;
    const allCompleted = totalTasks===completedTasks && totalTasks>0;

    let statusMessage='Keep going';
    if(totalTasks===0){
        statusMessage= 'No tasks available';
    }
    else if(allCompleted){
        statusMessage= 'All tasks completed';
    }
    else if(completedTasks>0){
        statusMessage= 'Good Progress';
    }
    return(
        <>
            <p>Total tasks: {totalTasks}</p>
            <p>Completed tasks: {completedTasks}</p>
            <p>Pending tasks: {pendingTasks}</p>

            <p>Status: {statusMessage}</p>

            {allCompleted && (
                <p style={{color:"green"}}>
                    Great job! You finished successfully.
                </p>
            )}
            <p>
                Progress:{' '}
                {allCompleted ? 'Finished':'Still in progress'}
            </p>
            <div>
                <h3>Task List</h3>
                {tasks.map((task)=>(
                    <div key={task.id}>
                        {task.title}-{task.completed ? 'Done':'Pending'}
                        <button onClick={()=>toggleTask(task.id)}>Toggle</button>
                    </div>
                ))}
            </div>
        </>
    )
}