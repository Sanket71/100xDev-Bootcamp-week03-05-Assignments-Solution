// Problem Description – Preemptive Priority Task Scheduler
//
// You are required to build a scheduler that executes async tasks
// based on priority.
//
// Higher-priority tasks should be executed before lower-priority ones.
// Long-running tasks must periodically yield control back to the scheduler
// so that newly arrived high-priority tasks can be processed.
//
// True preemption is not possible in JavaScript, so tasks must cooperate
// by yielding execution voluntarily.

class PriorityQueue{
  constructor(){
    this.queue=[];
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

class Scheduler {
  constructor() {
    this.pq=new PriorityQueue();
  }

  schedule(task, priority = 0) {
    this.pq.enqueue(task,priority);
  }

  run(onAllFinished) {
    const runNext=()=>{
      if(this.pq.isEmpty()){
        return onAllFinished(null);
      }

      const {task}=this.pq.deque();

      task((err,result)=>{
        if(err){
          return onAllFinished(err);
        }
        runNext();
      })
    }
    runNext();
  }
}

module.exports = Scheduler;
