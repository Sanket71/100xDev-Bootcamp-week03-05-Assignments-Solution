// Problem Description – Fair FIFO Mutex
//
// Implement a Mutex to control access to an async resource.
//
// Only one task may run at a time. Extra tasks must wait in a queue
// and be executed in FIFO order.
//
// When a task finishes, the lock should be released automatically
// and the next queued task should start.
//
// Requirements:
// - Run immediately if free.
// - Queue when locked (FIFO).
// - Auto-release on task completion.
class Mutex {
  constructor() {
    this.lockAvailable=true;
    this.queue=[];
  }

  lock(task, onComplete) {
    this.queue.push({task,onComplete});

    this.process();
  }

   process=()=>{
      if(this.queue.length==0 || !this.lockAvailable){
        return;
      }
      const {task,onComplete}=this.queue.shift();
      
      this.lockAvailable=false;

      task((err,data)=>{
        onComplete(err,data);
        this._release();
        this.process();
      })
    }

  _release() {
    this.lockAvailable=true;
  }
}

module.exports = Mutex;
