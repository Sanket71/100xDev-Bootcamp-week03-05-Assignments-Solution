// Problem Description – Priority Task Queue
//
// You are required to implement a PriorityQueueExecutor that runs async tasks sequentially.
//
// The executor must support push(task, priority), where higher priority runs first.
// If tasks are waiting, newly added high-priority tasks should jump ahead of lower-priority ones.

class PriorityQueue{
    constructor(){
        this.queue=[]
    }

    enqueue(task,priority){
        this.queue.push({task,priority});

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

class PriorityQueueExecutor {
  constructor() { 
    this.pq=new PriorityQueue();
    this.busy=true;
  }
  push(task, priority = 0) { 
    this.pq.enqueue(task,priority);
    if(this.busy){
      this._run();
    }
  }
  async _run() { 
    if(this.pq.isEmpty() || !this.busy){
      return;
    }
    this.busy=false;
    const {task,priority}= this.pq.deque();
    const data=await task();
    this.busy=true;
    this._run();
  }
}

module.exports = PriorityQueueExecutor;
