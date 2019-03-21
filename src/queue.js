const MaxHeap = require('./max-heap.js');

class PriorityQueue {
  constructor(maxSize) {
    this.maxSize = maxSize || 30;
    this.heap = new MaxHeap();
  }

  push(data, priority) {
    if (this.heap.size() >= this.maxSize) {
      throw new Error();
    }
    this.heap.push(data, priority);
  }

  shift() {
    if (this.isEmpty()) {
      throw new Error();
    }
    return this.heap.pop();
  }

  size() {
    return this.heap.size();
  }

  isEmpty() {
    return this.size() === 0;
  }
}

module.exports = PriorityQueue;
