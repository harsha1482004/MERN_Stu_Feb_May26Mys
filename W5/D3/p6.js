// await with non-promise values

function getReadyValue(){
    return 25;
}
function getDelayedValue(){
    return Promise.resolve(75);
}

async function showValues(params) {
    const readyValue=await getReadyValue();
    const delayedValue=await getDelayedValue();

    console.log("ready value:",readyValue);
    console.log("delayed value:",delayedValue);

}

showValues();