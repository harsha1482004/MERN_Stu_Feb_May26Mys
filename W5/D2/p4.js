// Writing custom callback func

function processStudent(name,score,callback,monkey){
    console.log("Student Name: ",name);
    console.log("Score: ",score);

    callback(name,score);
    monkey(name,score);
}

function showResult(name,score){
    if(score>=70){
        console.log(name+" has passed");
    }
    else{
        console.log(name+" has failed");
    }
}

function showGrade(name,score){
    if(score>=85){
        console.log("Grade: 'A+'");
    }
    else if(score>=75){
        console.log("Grade: 'A'");
    }
    else if(score>=65){
        console.log("Grade: 'B'");
    }
    else{
        console.log("Grade: 'Fail'");
    }
}
// processStudent("harsha",90,showGrade);
processStudent("Harsha",90,showGrade,showResult);