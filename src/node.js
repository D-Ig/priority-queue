/* eslint-disable no-param-reassign */
class Node {
  constructor(data, priority) {
    this.data = data;
    this.priority = priority;
    this.parent = null;
    this.left = null;
    this.right = null;
  }

  appendChild(node) {
    if (this.left !== null && this.right !== null) {
      return;
    }
    node.parent = this;
    if (this.left === null) {
      this.left = node;
    } else {
      this.right = node;
    }
  }

  removeChild(node) {
    if (this.left !== node && this.right !== node) {
      throw new Error();
    }
    node.parent = null;
    if (this.left === node) {
      this.left = null;
    } else {
      this.right = null;
    }
  }

  remove() {
    if (this.parent !== null) {
      this.parent.removeChild(this);
    }
  }

  swapWithParent() {
    const updateParentParentChild = () => {
      const parentOfParent = this.parent.parent;
      const parentOfNode = this.parent;
      if (parentOfParent === null) {
        return;
      }
      if (parentOfParent.left === parentOfNode) {
        parentOfParent.left = this;
      } else {
        parentOfParent.right = this;
      }
    };

    const updateChildren = () => {
      const leftChild = this.left;
      const rightChild = this.right;
      if (leftChild !== null) {
        leftChild.parent = this.parent;
      }
      if (rightChild !== null) {
        rightChild.parent = this.parent;
      }
      let remainingChild;
      if (this.parent.right === this) {
        remainingChild = this.parent.left;
        remainingChild.parent = this;
        this.left = remainingChild;
        this.right = this.parent;
      } else {
        this.left = this.parent;
        if (this.parent.right !== null) {
          remainingChild = this.parent.right;
          remainingChild.parent = this;
          this.right = remainingChild;
        }
      }
      this.parent.left = leftChild;
      this.parent.right = rightChild;
    };

    const updateParents = () => {
      const upperParrent = this.parent.parent;
      this.parent.parent = this;
      this.parent = upperParrent;
    };

    if (this.parent !== null) {
      updateParentParentChild();
      updateChildren();
      updateParents();
    }
  }
}

module.exports = Node;
