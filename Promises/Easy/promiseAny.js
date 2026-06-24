// Problem Description – promiseAny(promises)

// You are required to implement a function named promiseAny that accepts an array of Promises. 
// The function should return a new Promise that resolves immediately when any one of the input promises resolves successfully. 
// If all the promises reject, the returned Promise should reject with an error.
function promiseAny(promises) {
    return new Promise((resolve,reject)=>{
        let rejectCount=0;

        promises.forEach(promise => {
            Promise.resolve(promise).then(
                data=>resolve(data))
                .catch(reject);
        });
    })
}

module.exports = promiseAny;
