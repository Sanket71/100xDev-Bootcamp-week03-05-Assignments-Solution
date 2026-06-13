// Problem Description – Task Execution with Dependencies
//
// You are given a set of asynchronous tasks where some tasks depend on the completion of others.
// Your goal is to execute each task only after all of its dependencies have been successfully completed.
// The solution should ensure correct execution order and handle dependency relationships properly.
//
// Each task is asynchronous and must invoke a callback when finished.
// Invoke finalCallback after all tasks have completed, or with an error if any task fails.

function runWithDependencies(tasks, finalCallback) {
    const results={};
    const started=new Set();
    const completed=new Set();

    function tryRunTasks(){

        if(completed.size==tasks.length){
            finalCallback(null,results);
            return;
        }
        
        for(const task of tasks){
            if(started.has(task.id)){
                continue;
            }
            
            let canRun=true;

            if(task.deps!==undefined && task.deps.length!==0){
                canRun=task.deps.every(dep=>completed.has(dep));
            }

            if(!canRun){
                continue;
            }

            started.add(task.id)

            task.run((err,result)=>{
                if(err){
                    return finalCallback(err)
                }

                results[task.id]=result;
                completed.add(task.id);

                tryRunTasks();
            });
        }
    }
    tryRunTasks();
}

module.exports = runWithDependencies;
