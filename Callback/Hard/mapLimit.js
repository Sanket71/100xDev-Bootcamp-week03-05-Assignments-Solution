// Problem Description – Parallel Execution with Concurrency Limit
//
// You need to execute many asynchronous tasks (e.g., image downloads),
// but only a fixed number are allowed to run at the same time to avoid
// resource exhaustion.
//
// This problem tests concurrency control and result ordering.
//
// Requirements:
// - Accept an array of tasks and a concurrency limit.
// - Run at most `limit` tasks in parallel until all are completed.
// - Return results in the original task order via onAllFinished.

class CallbackPool{
    constructor(limit){
        this.limit=limit;
        this.running=0;
        this.queue=[];
        this.result=[];
    }
    run(task,index,done){
        if(this.running>=this.limit){
            this.queue.push({task,index,done});
            return;
        }
        this.running++;

        task((err,data)=>{
            this.result[index]=data;
            done();
            this.running--;
            this._next();
        })
    }
    
    
    _next() {
        if(this.running >= this.limit || this.queue.length==0){
            return;
        }

        const {task,index,done}=this.queue.shift();

        this.running++;

        task((err,data)=>{
            this.result[index]=data;
            done();
            this.running--;
            this._next();
        })
    }
}

function mapLimit(tasks, limit, onAllFinished) {
    if(tasks.length === 0){
        onAllFinished([]);
        return;
    }

    const pool=new CallbackPool(limit);
    let completed=0;

    tasks.forEach((task,index) => {
        pool.run(task,index,()=>{
            completed++;
            if(completed === tasks.length){
                onAllFinished(null,pool.result);
            }
        });
    });
}

module.exports = mapLimit;
