/*
题目-----------------------------------------------------------
给定一个链表，两两交换其中相邻的节点，并返回交换后的链表
你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

输入：head = [1,2,3,4]
输出：[2,1,4,3]

思路-----------------------------------------------------------

初始时，cur指向虚拟头结点，

暂存一下1
暂存一下3

将2给到1
将1给到2
将3给到3

然后将cur往后移动两位，开启新的操作

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
let list = [2,4,5,6,7,9];
let linkedList = new LinkedList();
list.forEach((item)=>{
    linkedList.addAtTail(item);
})

/* console.log("----init----",JSON.stringify(linkedList));  */

//交换对儿
let swapPairs = function(head){

    //设置虚拟头节点并指向head
    let dummyHead = new ListNode(0,head);
    //将他赋值给cur，方便循环中使用
    let cur = dummyHead;

    //保证有偶数位的时候继续
    while(cur.next && cur.next.next){
        //记录1
        let tmp = cur.next;
        //记录3
        let tmp1 = cur.next.next.next;

        cur.next = cur.next.next;//将2给到1
        cur.next.next = tmp;//将预存的1给到2
        cur.next.next.next = tmp1;//将预存的3给到3，归位

        //cur移动两位，准备下一轮交换
        cur = cur.next.next;
    }
    return dummyHead.next; 

}
let result = swapPairs(linkedList._head);
console.log("result",JSON.stringify(result));