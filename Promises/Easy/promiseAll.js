// Problem Description – Custom Implementation of Promise.all

// You are required to implement your own version of Promise.all without using the built-in method. 
// The function should accept an array of values that may include Promises or plain constants. 
// It must resolve with an array of results in the same order once all inputs resolve, or reject immediately if any input rejects.
function promiseAll(promises) {
    return new Promise((resolve,reject)=>{
        const result=[];
        let completed=0;

        if(promises.length==0){
            resolve([]);
            return;
        }

        promises.forEach((promise,index) => {
            Promise.resolve(promise).then(value=>{
                result[index]=value;
                completed++;

                if(completed==promises.length){
                    resolve(result);
                }
            }).catch(reject);
        });
        // for (let i = 0; i < promises.length; i++) {
        //     Promise.resolve(promises[i])
        //         .then(value => {
        //             result[i] = value;
        //             completed++;

        //             if (completed === promises.length) {
        //                 resolve(result);
        //             }
        //         })
        //         .catch(reject);
        // }
    })
}

module.exports = promiseAll;
