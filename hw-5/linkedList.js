class LinkedListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.top = null;
        this.bottom = null;
    }

    append(elem) {
        const newNode = new LinkedListNode(elem);

        if (!this.top || !this.bottom) {
            this.top = newNode;
            this.bottom = newNode;
        } else {
            this.bottom.next = newNode;
            this.bottom = newNode;
        }
    }

    prepend(elem) {
        const newNode = new LinkedListNode(elem);

        newNode.next = this.top;
        this.top = newNode;

        if (!this.bottom) {
            this.bottom = newNode;
        }
    }

    find(elem) {
        if (!this.top) {
            return null;
        }

        let curr = this.top;

        while (curr) {
            if (curr.value === elem) {
                return curr;
            }
            curr = curr.next;
        }

        return null;
    }

    toArray() {
        let curr = this.top;
        const arr = [];

        while (curr) {
            arr.push(curr.value);
            curr = curr.next;
        }

        return arr;
    }

    static fromIterable(iterable) {
        const isIterable = typeof iterable[Symbol.iterator] === 'function';

        if (!isIterable) {
            throw new Error('Not iterable');
        }

        const newLinkedList = new LinkedList();

        for (let element of iterable) {
            newLinkedList.append(element);
        }

        return newLinkedList;
    }
}