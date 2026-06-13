// Problem Description – Ordered Parallel Batcher
//
// You need to process many items in parallel, but with a fixed concurrency limit to avoid resource exhaustion.
//
// Tasks should start as soon as a slot is free, and the final results must preserve the original input order.
//
// Requirements:
// - Run at most `limit` workers in parallel.
// - Preserve the original order of results.
// - Start new work as soon as one finishes.
// - Stop and return an error if any task fails.

function batchProcess(items, limit, worker, onComplete) {
    const results=new Array(items.length);
    let running=0;
    let completed=0;
    let nextIndex=0;
    let failed = false;

    function startNext(){
        if(failed){
            return;
        }

        while (running < limit && nextIndex < items.length){
            const currentIndex=nextIndex++;
            running++;

            worker(items[currentIndex],(err,data)=>{
                running--;

                if(err){
                    failed=true;
                    return onComplete(err);
                }

                results[currentIndex]=data;
                completed++;

                if(completed == items.length){
                    return onComplete(null,data)
                }
                startNext();
            });
        }
    }

    if(items.length==0){
        return onComplete(null,[]);
    }

    startNext();
}

module.exports = batchProcess;
