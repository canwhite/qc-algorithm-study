/* 
使用队列实现栈的下列操作：
push(x) -- 元素 x 入栈
pop() -- 移除栈顶元素
top() -- 获取栈顶元素
empty() -- 返回栈是否为空

思路：
用两个队列que1和que2实现队列的功能，
que2其实完全就是一个备份的作用，
把que1最后面的元素以外的元素都备份到que2，
然后弹出最后面的元素，再把其他元素从que2导回que1。

就是pop的时候que1只有一个最前边的值在

注意:
你只能使用队列的基本操作-- 
    也就是 push to back, peek/pop from front, size, 和 is empty 这些操作是合法的。
你所使用的语言也许不支持队列。 
    你可以使用 list 或者 deque（双端队列）来模拟一个队列 , 只要是标准的队列操作即可。
你可以假设所有操作都是有效的
    （例如, 对一个空的栈不会调用 pop 或者 top 操作）
这里强调是单项队列    
*/
 
//话不多说，直接看代码
//queue只能用push和shift

var MyStark = function(){
    this.queue1 = [];
    this.queue2 = [];
}

MyStark.prototype.push = function(x){
    this.queue1.push(x);
}

//方法1，两队列操作
//将que1其余数据都按照原来的顺序放进que2,只保留最底部的一个数据
//将这个数据pop之后，que1为空，再将que2装回1
/* 
MyStark.prototype.pop = function(){
    //减少两个队列交换的次数，只有当queue1为空时，交换两个队列
    if(!this.queue1.length){
        //[a,b]=[b,a] 交换数据
        [this.queue1,this.queue2] = [this.queue2,this.queue1];
    }
    //>1是要留一个最底的
    while(this.queue1.length >1){
        //用shift拿，顺序不变
        this.queue2.push(this.queue1.shift());
    }
    return this.queue1.shift();
} 
*/
//方法二：单队列操作
MyStark.prototype.pop = function(){
    let size = this.queue1.length;
    //留了早的一个在最底层
    while(size-- >1){
        this.queue1.push(this.queue1.shift());
    }
    //然后将最底层的这个拿出来
    return this.queue1.shift();
} 


//先拿出来，再放回去，然后返回这个拿出来的数据
MyStark.prototype.top = function(){
    const x = this.pop();
    this.queue1.push(x);
    return x;
}
MyStark.prototype.is_empty = function(){
    //return !this.queue1.length && !this.queue2.length;//方法一
    return !this.queue1.length;
}



let stack = new MyStark();
stack.push(1);
stack.push(2);
stack.pop();
stack.push(3);
stack.push(4);
stack.pop();
stack.pop();
stack.pop();
console.log(stack.is_empty())