/**
 * 表示一个队列的类
 * @class
 * @namespace Queue
 * @author HowesDOMO <164572429@qq.com>
 * @version 0.1.1
 */
class Queue {
    /**
     * 创建一个指定大小的队列
     * @constructor
     * @param {number} size - 队列的最大大小
     * @throws {string} 如果size不是有效的整数，抛出错误
     * @throws {string} 如果size不是正整数，抛出错误
     */
    constructor(size) {
        // 检查 size 是否是有效整数
        if (!Number.isInteger(size)) {
            throw `参数size不是 Number 类型。size: ${size}`;
        }

        // 检查 size 是否为正整数
        if (size <= 0) {
            throw `参数size请传入正整数。size: ${size}`;
        }

        // 使用空数组初始化队列，并设置最大大小
        this.items = [];
        this.maxSize = size;
    }

    /**
     * 将项添加到队列的末尾
     * @param {*} item - 要添加到队列的项
     * @returns {Array} - 更新后表示队列的数组
     */
    enqueue(item) {
        // 检查队列是否已达到最大大小
        if (this.items.length >= this.maxSize) {
            // 如果队列已满，移除最老的项（数组中的第一项）
            this.items.shift();
        }

        // 将新项添加到队列的末尾
        this.items.push(item);

        // 返回更新后表示队列的数组
        return this.items;
    }

    /**
     * 从队列的前端移除最早的项
     * @returns {Array} - 更新后表示队列的数组
     */
    dequeue() {
        // 从队列的前端移除最老的项
        this.items.shift();

        // 返回更新后表示队列的数组
        return this.items;
    }
}

// 示例用法:
// const myQueue = new Queue(3); // 创建一个最大大小为3的队列
// myQueue.enqueue('A'); // 入队一个项 'A'
// myQueue.enqueue('B'); // 入队一个项 'B'
// console.log(myQueue.dequeue()); // 出队，移除最老的项 ('A')
// console.log(myQueue.enqueue('C')); // 入队一个项 'C'，移除最老的项 ('B')