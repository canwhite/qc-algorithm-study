//声明单个node
class ListNode {
    //node节点类提供当前值和指针
    //这是链表的基础单位，我们还要另外创建一个链表
    constructor(val,next){
        this.val = val;
        this.next = next;
    }
}

//声明链表类
function MyLinkedList(){
    //链表的长度
    this._size = 0;
    this._head = null;
    this._tail = null;
}

//在链表的结尾插入新节点
MyLinkedList.prototype.addAtTail = function(val){
    //往尾部添，先新建一个node
    var node = new ListNode(val,null);
    //如果链表没有节点
    if(!this._head){
        this._head = node;
    }else{
        /*
        特征：
        current是个外置对象，一开始是haad
        用来程接循环变化的next
        next如果存在，就会一直往下走，
        直到走到最后一个，在链表中相当好用

        */
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

/*
构建两个有序链表
*/
var arr1 = [2, 4, 6, 8];
var arr2 = [1, 3, 5, 7];
var list1 = new MyLinkedList();
var list2 = new MyLinkedList();

arr1.forEach(function(val){
    list1.addAtTail(val);
});
arr2.forEach(function(val){
    list2.addAtTail(val);
});


/*
方法一：
最简单的思路，把两个链表的所有val拿出来放在一个数组里，
然后我们对数组进行排序，根据数组从新构建一个链表
*/
function mergeLinkedList (list1, list2) {
    //存放两个链表所有val的数组
    var array = [];
    //最终需要返回的新链表
    var list = new MyLinkedList();
    //第一个链表的头节点
    var listHead1 = list1._head;
    //第二个链表的头节点
    var listHead2 = list2._head;

    //将第一个链表的所有val放进数组
    while(listHead1){
        array.push(listHead1.val);
        listHead1 = listHead1.next;
    }
    //将第二个链表的所有val放进数组
    while(listHead2){
        array.push(listHead2.val);
        listHead2 = listHead2.next;
    }
    //对数组进行排序
    array = array.sort((a,b)=>{
        return a - b;
    })

    //使用数组重新构建链表
    array.forEach((item)=>{
        list.addAtTail(item);
    })
    return list;

}

//我们来调用一下这个方法
const result =  mergeLinkedList(list1,list2);
console.log("result",JSON.stringify(result));


/*
方法2:
按顺序将两个链表的val插入到新链表
*/
var mergeLinkedList2 = (list1,list2)=>{
    //新建一个链表
    var list = new MyLinkedList();
    //拿到1、2两个链表的头节点
    var current1 = list1._head;
    var current2 = list2._head;

    //循环将两个链表的val插入到新链表
    while(current1 && current2){
        if(current1.val < current2.val){
            list.addAtTail(current1.val);
            current1 = current1.next;
        }else{
            list.addAtTail(current2.val);
            current2 = current2.next;
        }
    }

    //找到新链表的最后一个节点
    var current = list._head;
    //如果下一个节点存在，就切到下一个节点
    while(current.next){
        current = current.next;
    }
    //如果链表一比较长的话，继续将链表一后边的数据拼到后边
    if(current1){
        while(current1){
            list.addAtTail(current1.val);
            current1 = current1.next;
        }
    }
    if(current2){
        while(current2){
            list.addAtTail(current2.val);
            current2 = current2.next;
        }
    }
    return list;

}

const result2 = mergeLinkedList2(list1,list2);
console.log("result2",JSON.stringify(result2));

