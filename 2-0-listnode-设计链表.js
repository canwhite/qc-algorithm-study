
/*
什么是链表
链表是数据结构之一，其中的数据呈线性排列
最普通的就是单向链表

1.每一个数据都有一个“指针”, 它指向下一个数据的内存地址
2.在链表中，数据一般就是分散存储于内存中的，无需存储在连续空间内
3.由于数据是分散存储的，所以要访问数据，需要从第1个数据开始，顺着指针的指向，一个个往下访问
4.如果想要添加数据，只需要改变添加位置前后的指针指向，需要改变前后指针
5.数据的删除也是改变指针的指向，只需要概念后边的指向，跳过删除的那一环就可以了

另外的链表：
循环链表：尾部指向头部
想要保持数量固定的更新数据时通常会使用这种链表

双向链表：单项和循环链表的每个数据只有一个指针，指向后边的数据
但是我们可以吧指针设定为两个，分别指向前后数据，这就是“双向链表”
使用这种链表，不仅可以从前往后，也可以从后往前遍历数据，十分方便

但是也有两个缺点：
1.指针的增加会导致存储空间需求增加
2.添加和删除数据时需要改变更多的指针的指向


*/
//设计链表

class ListNode {
    //值和指针
    constructor(val,next){
        this.val = val;
        this.next = next;
    }
}
//单项链表,存储头尾节点和节点数量
var QCLinkedList = function(){
    this._size = 0;
    this._tail = null;
    this._head = null;
}
//通过index获取node，再实现一个方法返回val，如果没有返回-1
QCLinkedList.prototype.getNode = function(index){
    if(index < 0 || index>=this._size) return null;
    //创建虚拟头节点,虚拟头节点 -> head
    let cur = new ListNode(0,this._head);
    //然后通过index--，循环将虚拟头节点通过next一直推到我们想要的节点
    while(index-- >= 0){
        cur = cur.next
    }
    return cur;
}
//然后通过get放回val
QCLinkedList.prototype.getAtIndex =function(index){
    if(index < 0 || index >= this._size) return -1;
    //获取当前节点
    return this.getNode(index).val;
}

//在头部添加节点
QCLinkedList.prototype.addAtHead = function(val){
    //将当前节点的next指向之前的head
    const node = new ListNode(val,this._head);
    //然后将this._head指向当前节点
    this._head = node;
    this._size++ ;
    if(!this._tail){
        this._tail = node;
    }
}
//在尾部添加节点

/*
QCLinkedList.prototype.addAtTail = function(val){
    const node = new ListNode(val,null);//最后一个没有next
    this._size++;
    //如果tail已经存在
    if(this._tail){
        //先将this._tail.next指向node
        this._tail.next = node;
        //让tail的指针也指向node，即之前的this._tail.next
        this._tail = node;
        return;
    }
    //如果是_tail不存在，相当于初始化状态
    this._tail = node;
    this._head = node;
}
*/



//在链表的结尾插入新节点

QCLinkedList.prototype.addAtTail = function(val){
    var node = new ListNode(val,null);
    //如果链表没有节点
    if(!this._head){
        this._head = node;
    }else{
        //通过循环找到最后一个节点，然后让最后一个节点指向新节点
        var current = this._head;
        while(current.next){
            current = current.next;
        }
        current.next = node;
        this._tail = node;
    }
    //修改链表链的长度
    this._size++;
}

//判断val是否存在，并返回index
QCLinkedList.prototype.getAtVal = function(val){
    
    if(this._head){
        var current = this._head;
        var index = 0;
        while(current.next){
            if(current.val == val){
                return index;
            }else{
                index++;
                current = current.next;
            }
        }
        return -1;
    }else{
        return -1;
    }
}


//按index添加node，而不仅仅是在首尾两个部分添加
QCLinkedList.prototype.addAtIndex = function(index,val){
    if(index > this._size) return;
    if(index <= 0){
        //那就在头部添加
        this.addAtHead(val);
        return;
    }
    if(index == this._size){
        this.addAtTail(val);
        return;
    }
    //获取目标节点的上一个节点
    const node = this.getNode(index-1);
    //建设一个新节点，处于node之后，node.next之前
    const newNode = new ListNode(val,node.next);
    node.next = newNode;

    this._size++;
}

//按index删除node
QCLinkedList.prototype.deleteAtIndex = function(index){
    if(index < 0 || index >= this._size) return;
    if(index === 0) {
        this._head = this._head.next;
        this._size--;
        return;
    }
    // 获取目标节点的上一个的节点
    const node = this.getNode(index - 1); 
    //压缩   
    node.next = node.next.next;
    // 处理尾节点
    if(index === this._size - 1) {
        this._tail = node;
    }
    this._size--;

}

var obj = new QCLinkedList()
obj.addAtTail(1);
obj.addAtTail(2);
obj.addAtTail(4);
obj.addAtHead(5);
// console.log(JSON.stringify(obj));//输出的时候字符串化，就可以看到所有数据
// console.log(obj.getAtIndex(2));//得到2
// console.log(obj.deleteAtIndex(2))//删除
// console.log(JSON.stringify(obj));

//这个增加的方法好像失败了
obj.addAtIndex(2,2)
console.log(JSON.stringify(obj));

console.log(obj.getAtVal(5)) 



//todo1:可以创建一个链表的工具类
//todo2:如何让其同时支持es module和commonjs规范


