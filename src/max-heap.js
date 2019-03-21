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

  // eslint-disable-next-line consistent-return
  pop() {
    if (this.root !== null) {
      const detachedRoot = this.detachRoot();
      this.restoreRootFromLastInsertedNode(detachedRoot);
      this.shiftNodeDown(this.root);
      return detachedRoot.data;
    }
  }

  detachRoot() {
    const rootNode = this.root;
    this.root = null;
    if (this.parentNodes.includes(rootNode)) {
      this.parentNodes.shift();
    }
    return rootNode;
  }

  restoreRootFromLastInsertedNode(detached) {
    const leftRootChild = detached.left;
    const rightRootChild = detached.right;
    if (leftRootChild === null) {
      return;
    }
    const lastInsertedNode = this.parentNodes.pop();
    this.root = lastInsertedNode;
    if (this.parentNodes.length !== 0) {
      lastInsertedNode.appendChild(leftRootChild);
      lastInsertedNode.appendChild(rightRootChild);
      if (lastInsertedNode.parent.right === lastInsertedNode) {
        this.parentNodes.unshift(lastInsertedNode.parent);
      }
    }
    lastInsertedNode.remove();
  }

  size() {
    const calcTotalNodes = (node) => {
      const getBranchSum = branch => (branch !== null ? 1 + calcTotalNodes(branch) : 0);
      return getBranchSum(node.left) + getBranchSum(node.right);
    };
    return this.root === null ? 0 : calcTotalNodes(this.root) + 1;
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
      return;
    }
    if (node.priority > node.parent.priority) {
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
    if (node === null) {
      return;
    }
    if (node.left === null && node.right === null) {
      return;
    }
    const getMaxChildPriority = (leftChild, rightChild) => {
      if (leftChild !== null && rightChild !== null) {
        return Math.max(leftChild.priority, rightChild.priority);
      }
      return leftChild === null ? rightChild.priority : leftChild.priority;
    };
    const maxChildPriority = getMaxChildPriority(node.left, node.right);
    if (node.priority < maxChildPriority) {
      const childToSwap = maxChildPriority === node.left.priority ? node.left : node.right;
      if (this.root === node) {
        this.root = childToSwap;
      }
      const childI = this.parentNodes.indexOf(childToSwap);
      const nodeI = this.parentNodes.indexOf(node);
      if (nodeI !== -1 && childI !== -1) {
        this.parentNodes[nodeI] = childToSwap;
        this.parentNodes[childI] = node;
      } else if (childI !== -1) {
        this.parentNodes[childI] = node;
      }
      childToSwap.swapWithParent();
      this.shiftNodeDown(node);
    }
  }
}

module.exports = MaxHeap;
