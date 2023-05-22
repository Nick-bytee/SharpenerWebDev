class Queue {
    constructor(queue) {
        this.queue = [];
        this.minpos = 0;
        this.maxpos = -1;
    }

    pushIntoQueue(value) {
        // Push the value into the queue
        this.maxpos++;
        this.queue[this.maxpos] = value;
    }

    popFromQueue() {
        // Return the elements based on FIFO logic
        // When no elements remain to return, return -1
        if (this.minpos > this.maxpos) {
            return -1;
        } else {
            const element = this.queue[this.minpos];
            this.minpos++;
            return element;
        }
    }
}

var x = new Queue();
x.pushIntoQueue(1);
x.pushIntoQueue(2);
console.log(x.queue);
