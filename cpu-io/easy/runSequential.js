// Problem Description – Sequential Execution of Async Functions

// You are given an array of asynchronous functions. Your task is to execute them one by one, ensuring that each function starts only after the previous one has completed. 
// The final result should be an array of resolved values in the same order.
async function runSequential(functions) {
    try{
        const results=[];
        for(func in functions){
            const data=await func();
            results.push(data)
        }

        return results;
    }catch(err){
        return err;
    }
}

module.exports = runSequential;

