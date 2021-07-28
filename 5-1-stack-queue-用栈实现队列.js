/*
工作中没有人这么搞，但确实是考察栈和对列的好题目
因为正常一个unshift一个pop就完事了

使用栈实现队列的下列操作
push(x) -- 将一个元素放入队列的尾部。
pop() -- 从队列首部移除元素。
peek() -- 返回队列首部的元素。
empty() -- 返回队列是否为空。

示例:

MyQueue queue = new MyQueue();
queue.push(1);
queue.push(2);
queue.peek();  // 返回 1
queue.pop();   // 返回 1
queue.empty(); // 返回 false

思路：使用两个栈，关键在于栈的倒装

说明：
你只能使用标准的栈操作 -- 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。
你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。
假设所有操作都是有效的 （例如，一个空的队列不会调用 pop 或者 peek 操作）。
*/

// 使用两个数组的栈方法（push, pop） 实现队列
var MyQueue = function(){
    this.stack1 = [];
    this.stack2 = [];
}
//push就是简单的push
MyQueue.prototype.push = function(x){
    this.stack1.push(x);
}

/*
pop的时候稍显复杂一点
我们需要把stack1里边的数据再stack2中倒装一遍
*/
MyQueue.prototype.pop = function(){
    const size = this.stack2.length;
    //如果已经倒装过了，我们就返回
    if(size){
        return this.stack2.pop();
    }
    //如果没有倒装，我们就先倒装再返回
    while(this.stack1.length){
        //在stack1去pop的过程中，stack2去push
        //将stack1中的数据在stack2中倒装了
        //stack2就是我们最终想要的理想的数据
        this.stack2.push(this.stack1.pop());
    }
    return this.stack2.pop();
}
//peek只拿不删
MyQueue.prototype.peek = function(){
    const x = this.pop();//弹出来
    this.stack2.push(x);//再装进去
    return x;//我们显示弹出来的这个值
}
//为空判断
MyQueue.prototype.is_empty = function(){
    return !this.stack1.length && !this.stack2.length;
}
let queue = new MyQueue();
queue.push(1);
queue.push(2);
console.log(queue.peek());  // 返回 1
console.log(queue.pop())  // 返回 1
queue.is_empty(); // 返回 false

