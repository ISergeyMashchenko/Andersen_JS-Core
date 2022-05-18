class StackNode {
    constructor(data) {
        this.data = data;
        this.previous = null;
    }
}

class Stack {
    constructor(maxElements = 10) {
        if (typeof maxElements !== 'number' || maxElements < 0) {
            throw new Error('Invalid number');
        } else {
            this.maxElements = maxElements;
        }

        this.size = 0;
        this.top = null;
    }

    push(elem) {
        if (this.size === this.maxElements) {
            throw new Error('Stack is full!');
        }

        const newNode = new StackNode(elem);

        newNode.previous = this.top || null;
        this.size++;
        this.top = newNode;
    }

    pop() {
        if (!this.size === 0) {
            throw new Error('Stack is empty!');
        }

        const deletedElement = this.top;

        this.top = this.top.previous || null;
        this.size--;

        return deletedElement.data;
    }

    peek() {
        if (this.size === 0) {
            return null;
        }

        return this.top.data;
    }

    isEmpty() {
        return this.size == 0;
    }

    toArray() {
        let curr = this.top;
        const arr = [];

        while (curr) {
            arr.unshift(curr.data);
            curr = curr.previous;
        }

        return arr;
    }

    static fromIterable(iterable) {
        const isIterable = typeof iterable[Symbol.iterator] === 'function';

        if (!isIterable) {
            throw new Error('Not iterable');
        }

        const stack = new Stack(iterable.size);

        for (let element of iterable) {
            stack.push(element);
        }

        return stack;
    }
};