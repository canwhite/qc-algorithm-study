/*
题目-----------------------------------------------------------
给定一个链表，两两交换其中相邻的节点，并返回交换后的链表
你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

输入：head = [1,2,3,4]
输出：[2,1,4,3]

思路-----------------------------------------------------------

初始时，cur指向虚拟头结点，然后进行如下三步

然后cur到2，2再到1，1再到2的后边


*/

var ListNode = function(val,next){
    this.val = val;//当前值
    this.next = next;//用于联系前后的链
}

var LinkedList = function(){
    this._head = null;//主要是head
    this._tail = null;
    this._size = 0;

}

LinkedList.prototype.addAtTail = function(val){
    var node = new ListNode(val,null);
    //先判断头，如果没有头
    if(!this._head){
        this._head = node;
    }else{
        let current = this._head;
        while(current.next){
            current = current.next;
        }
        current.next = node;
        this._tail = node;
    }
}
let list = [2,4,5,6,7];
let linkedList = new LinkedList();
list.forEach((item)=>{
    linkedList.addAtTail(item);
})

console.log("----init----",JSON.stringify(linkedList)); 