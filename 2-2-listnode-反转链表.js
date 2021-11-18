/*
题目---------------------------
题意：反转一个单链表。
示例: 输入: 1->2->3->4->5->NULL 输出: 5->4->3->2->1->NULL

思路---------------------------
如果再定义一个新的链表，实现链表元素的反转，其实这是对内存空间的浪费。
其实只需要改变链表的next指针的指向，直接将链表反转 ，而不用重新定义一个新的链表。

----

首先定义一个cur指针，指向头结点，再定义一个pre指针，初始化为null。

然后就要开始反转了，首先要把 cur->next 节点用tmp指针保存一下，也就是保存一下这个节点。

为什么要保存一下这个节点呢，因为接下来要改变 cur->next 的指向了，将cur->next 指向pre ，
此时已经反转了第一个节点了。

接下来，就是循环走如下代码逻辑了，继续移动pre和cur指针。

最后，cur 指针已经指向了null，循环结束，链表也反转完毕了。

此时我们return pre指针就可以了，pre指针就指向了新的头结点。


*/

//首先创建一个节点对象，这个是链表的基础单元
class ListNode{
    constructor(val,next){
        this.val = val;
        this.next = next;
    }
}
//声明链表类
function LinkedList(){
    this._size = 0;
    this._head = null;
    this._tail = null;
}
//链表生成
LinkedList.prototype.addAtTail = function(val){
    var node = new ListNode(val,null);
    if(!this._head){
        //如果还没有头
        this._head = node;
    }else{
        //如果已经有头了
        let current = this._head;
        //一直找到没有next
        while(current.next){
            current = current.next;
        }
        //我们就再加一个next，并给tail赋值
        current.next = node;
        this._tail = node;
    }
}

let list = [2,4,5,6,7];
let linkedList = new LinkedList();
list.forEach((item)=>{
    linkedList.addAtTail(item);
})

/* console.log("----init----",JSON.stringify(linkedList)); 
 */
//反转单列表

/* 

let reverseList = (head)=>{
    let temp;//保存一下cur的下一个节点
    let cur = head;
    let pre = null;
    while(cur){
        temp = cur.next;//保存，用来给cur，也方便了下一步的指向
        cur.next = pre;//将pre指向next，链表掉头
        pre = cur;//给pre赋值cur
        cur = temp;//续着链接着搞
    }
    return pre;
}
let result = reverseList(linkedList._head);
console.log("----result1----",JSON.stringify(result)); 

*/



//递归的整体思路实际上和双指针法是一样的
let reverse = function(pre,cur){
    if(!cur) return pre;
    //其实主要就是着三步
    const temp = cur.next;
    cur.next = pre;
    pre = cur;
    //temp是通过reverse延续的
    return reverse(pre,temp);
}
var reverseList2 = (head)=>{
    return reverse(null, head);
}

let result2 = reverseList2(linkedList._head);
console.log("---result2---",JSON.stringify(result2));





