// Higher order function
// 1.a fun which takes another fun as a parameter

function createMutiplier(factor){
    return function(number){
        return number*factor;
    }
}
let double= createMutiplier(2);
console.log("Double of(10):",double(10));
let triple= createMutiplier(3);
console.log("Triple of(10)",triple(10));