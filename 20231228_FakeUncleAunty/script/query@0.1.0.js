// TODO 看视频学习如何写注释
class Queue {
	constructor(size) {
		if (Number.isInteger(size) == false) {
			throw `参数size不是 Number 类型。size: ${size}`;
		}

		if (size <= 0) {
			throw `参数size请传入正整数。size: ${size}`;
		}

		this.items = [];
		this.maxSize = size;
	}

	enqueue(item) {
		if (this.items.length >= this.maxSize) {
			this.items.shift();
		}
        this.items.push(item);
        return this.items;
	}

	dequeue() {
        this.items.shift();
        return this.items;
	}
}
