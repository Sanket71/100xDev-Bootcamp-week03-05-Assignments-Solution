// Problem Description – Priority Task Queue with Dynamic Concurrency
//
// You are required to implement a task queue that executes asynchronous tasks based on priority.
// Higher-priority tasks should be executed before lower-priority ones.
// The queue must enforce a concurrency limit, ensuring only a fixed number of tasks run at the same time.
// The concurrency limit can be updated dynamically while the system is running.
// Each task must invoke its callback when finished.

class PriorityQueue{
    constructor(){
        this.queue=[]
    }

    enqueue(task,priority,onComplete){
        this.queue.push({task,priority,onComplete});

        this.queue.sort((a,b)=>b.priority-a.priority);
    }

    deque(){
        return this.queue.shift();
    }

    peek(){
        return this.queue[0];
    }

    isEmpty(){
        return this.queue.length===0;
    }
}

class DynamicPriorityQueue {
    constructor(concurrency) {
        this.limit=concurrency;
        this.running=0;
        this.pq=new PriorityQueue();
  }

  setLimit(newLimit) {
    this.limit=newLimit;
    this.runNext();
  }

  add(task, priority, onComplete) {
    if(this.running >= this.limit){
        this.pq.enqueue(task,priority,onComplete);
        return;
    }
    this.running++;

    task((err,result)=>{
        onComplete(err,result);
        this.running--;
        this.runNext();
    })
  }

  runNext() {
    if(this.running>=this.limit || this.pq.isEmpty()){
        return;
    }

    const {task,priority,onComplete}=this.pq.deque();

    this.running++;

    task((err,result)=>{
        onComplete(err,result);
        this.running--;
        this.runNext();
    })
    
  }
}

module.exports = DynamicPriorityQueue;