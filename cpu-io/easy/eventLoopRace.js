// Problem Description – Event Loop Execution Order
//
// You are given a script that mixes synchronous code, Promises (microtasks),
// and timers (macrotasks).
//
// Your task is to understand and predict the order in which the logs
// are printed to the console.
//


function eventLoopRace() {
    console.log("synchronous code")

    setTimeout(()=>{
        console.log("Timer");
    },0);

    Promise.resolve().then(()=>{
        console.log("Resolved Promise");
    })

    console.log("another synchronous code")
}

module.exports = eventLoopRace;
