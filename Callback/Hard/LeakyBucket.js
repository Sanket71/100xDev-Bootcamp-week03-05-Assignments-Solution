// Problem Description – Leaky Bucket Rate Limiter
//
// You are required to implement a RateLimiter based on the Leaky Bucket algorithm.
//
// The rate limiter has a fixed capacity and processes tasks at a constant rate.
// Tasks are executed in the exact order they are received.
//
// Requirements:
// 1. The bucket has a maximum capacity
// 2. Tasks are processed at a fixed interval (leak rate)
// 3. If the bucket is full, new tasks must be rejected immediately
// 4. Fairness must be preserved (FIFO execution)

class LeakyBucket {
  constructor(capacity, leakRateMs) {
    this.capacity=capacity;
    this.leakRateMs=leakRateMs;
    this.queue=[];
    this.timer=null;
  }

  add(task, onComplete) {
    if(this.queue.length >= this.capacity){
      return onComplete(new Error("Rate Limit Exceeded"));
    }

    this.queue.push({task,onComplete});

    if(!this.timer){
      this._process();
    }
  }

  _process() {
    this.timer=setInterval(()=>{
      if(this.queue.length===0){
        clearInterval(this.timer);
        this.timer=null;
        return;
      }

      const {task,onComplete}=this.queue.shift();

      task((err,result)=>{
        onComplete(err,result);
      })
    },this.leakRateMs);
  }
}

module.exports = LeakyBucket;
