// Problem Description – I/O Operation With Timeout
//
// You are given an asynchronous function that represents an I/O-bound task
// (such as a network request or database call).
//
// Your task is to execute this function, but enforce a time limit.
// If the I/O operation does not complete within the specified number
// of milliseconds, the returned promise should reject with a "Timeout" error.

async function ioWithTimeout(fn, ms) {
    const start=Date.now();
    const data=await fn();
    const end=Date.now();

    if(end-start>ms){
        return new Promise((resolve,reject)=>{
            reject("Timeout")
        })
    }

    return data;
}

module.exports = ioWithTimeout;
