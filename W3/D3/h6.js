// Nested Objects and method
const student={
    firstName:"Hruthik",
    lastName:"Gowda",
    scores:{
        science:83,
        math:93
    },
    hobbies:["reading","singing"],
    fullname:function(){
        return this.firstName + " "+this.lastName;
    },
    greet(){
        console.log("Hi,",this.fullname());
    }
}
console.log(student.fullname());