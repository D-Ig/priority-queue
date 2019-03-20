const Node = require('./node');

class MaxHeap {
  constructor() {
    this.root = null;
    this.parentNodes = [];
  }

  push(data, priority) {
    const node = new Node(data, priority);
    this.insertNode(node);
    this.shiftNodeUp(node);
  }

  pop() {
    if (this.root === null) {
      return;
    }
  }

  detachRoot() {
    const rootNode = this.root;
    if (this.parentNodes.includes(rootNode)) {
      this.parentNodes.shift();
    }
    this.root = null;
    return rootNode;
  }

  restoreRootFromLastInsertedNode(detached) {
    const lastInsertedNode = this.parentNodes[this.parentNodes.length - 1];
    this.root = lastInsertedNode;
    const leftRootChild = detached.left;
    const rightRootChild = detached.right;
    lastInsertedNode.appendChild(leftRootChild);
    lastInsertedNode.appendChild(rightRootChild);
    this.parentNodes.pop();
    if (lastInsertedNode.parent.right === lastInsertedNode) {
      this.parentNodes.unshift(lastInsertedNode.parent);
    }
    lastInsertedNode.remove();
  }

  size() {

  }

  isEmpty() {
    return this.root === null;
  }

  clear() {
    this.root = null;
    this.parentNodes = [];
  }

  insertNode(node) {
    if (this.root === null) {
      this.root = node;
      this.parentNodes.push(node);
    } else {
      this.parentNodes[0].appendChild(node);
      this.parentNodes.push(node);
      if (this.parentNodes[0].right !== null) {
        this.parentNodes.shift();
      }
    }
  }

  shiftNodeUp(node) {
    if (this.root === node) {
      return; // questionable
    }
    const nodePriority = node.priority;
    const parentPriority = node.parent.priority;
    if (nodePriority > parentPriority) {
      if (node.parent === this.root) {
        this.root = node;
      }
      const parentI = this.parentNodes.indexOf(node.parent);
      const nodeI = this.parentNodes.indexOf(node);
      if (nodeI !== -1 && parentI !== -1) {
        this.parentNodes[nodeI] = node.parent;
        this.parentNodes[parentI] = node;
      } else if (nodeI !== -1) {
        this.parentNodes[nodeI] = node.parent;
      }
      node.swapWithParent();
      this.shiftNodeUp(node);
    }
  }

  shiftNodeDown(node) {
    
  }
}

module.exports = MaxHeap;
