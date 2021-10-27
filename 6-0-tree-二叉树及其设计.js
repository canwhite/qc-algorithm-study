/* 

----------二叉树概念介绍-----------

二叉树的每个结点最多有两个子结点，所以叫做二叉树

function TreeNode(val,left,right){
    this.val = val || "";
    this.left = left || null;
    this.right = right || null;
}

大家会发现二叉树的定义 和链表是差不多的，相对于链表 ，
二叉树的节点里多了一个指针， 有两个指针，指向左右孩子.



二叉树有两种主要的形式：
1.满二叉树
2.完全二叉树

* 满二叉树：
深度为k，有2^k-1个结点的二叉树。
除了顶部一个结点外，其它每一层都是正好满的

* 完全二叉树：
树枝是满的，一层可以不满，如果枝儿上少了一个，就不能叫做完全二叉树
堆就是一个完全二叉树，也就是说堆是二叉树的一种


二叉树根据作用又区分：
1.二叉搜索树
2.平衡二叉搜索树（二叉搜索树的子项）

*  二叉搜索树
二叉搜索树是有数值的，二叉搜索树是一个有序树
也有以下特征：
(1) 若它的左子树不空，则左子树的所有结点的值均小于它的根结点的值
(2) 若它的右子树不空，则右子树的所有节点的值均大于它的根结点的值
(3) 它的左、右子树也分别为二叉排序树

* 平衡二叉搜索树
特征：
它是一棵空树或它的左右两个子树的高度差的绝对值不超过1，并且左右两个子树都是一棵平衡二叉树。
它是二叉搜索树的子集
空树不说，
最主要的特征就是：左右两个子树的高度差的绝对值不超过1

C++中map、set、multimap，multiset的底层实现都是平衡二叉搜索树，
所以map、set的增删操作时间时间复杂度是logn，
注意我这里没有说unordered_map、unordered_set，unordered_map、unordered_map底层实现是哈希表。
这些也是无序的，c++无序的用了嘻哈表

所以大家使用自己熟悉的编程语言写算法，
一定要知道常用的容器底层都是如何实现的，
最基本的就是map、set等等，否则自己写的代码，自己对其性能分析都分析不清楚！


----------二叉树的存储方式-------------
二叉树可以
* 链式存储
* 顺序存储
那么链式存储方式就用指针，顺序存储的方式就是用数组

顾名思义：
顺序存储的元素在内存中是连续分布的
链式存储则是通过指针把分布在各个地址的节点串联一起

链式存储我们讲链表的时候其实已经很熟悉，
所以我们来看看如何进行顺序存储？
其实就是用数组来存储二叉树，从上到下一层层的排

那么顺序存储如何遍历呢？
因为是一行填满了再添加另外一行，所以如果
父节点的数组下标是i,那么它的左孩子就是i*2 + 1,右孩子就是 i *2 +2; 

整体来说，用链式保存的二叉树，更有利于我们理解，所以一般都是用链式存储二叉树
但是大家要了解，用数组依然可以表示二叉树

---------------二叉树的遍历方式-----------------
二叉树主要是两种遍历方式：
1.深度优先遍历：先往深走，遇到叶子结点再往回走
2.广度优先遍历：一层一层的遍历

这两种遍历时图论中最基本的两种遍历方式，后面在介绍图论时候还会介绍到。

* 深度优先遍历
    前中后说的是中间节点的位置设置
    前序遍历(中间节点在前，递归法、迭代法)
    中序遍历(中间节点在中，递归法、迭代法)
    后续遍历(中间节点在后，递归法、迭代法)

* 广度优先遍历
    层次遍历

最后再说一说二叉树中深度优先和广度优先遍历实现方式，
我们做二叉树相关题目，经常会使用递归的方式来实现深度优先遍历，也就是实现前中后序遍历，使用递归是比较方便的。

之前我们讲栈与队列的时候，
就说过栈其实就是递归的一种是实现结构，
也就说前中后序遍历的逻辑其实都是可以借助栈使用非递归的方式来实现的。

而广度优先遍历的实现一般使用队列来实现，
这也是队列先进先出的特点所决定的，因为需要先进先出的结构，才能一层一层的来遍历二叉树。

这里其实我们又了解了栈与队列的一个应用场景了。

具体的实现我们后面都会讲的，这里大家先要清楚这些理论基础。

*/

//基本二叉树的设计,这是一个无序的二叉树
function BinaryTree(){
    //节点对象
    var Node = function(val){
        this.value =val;
        this.left = null;
        this.right = null;
    }
    //根节点
    this.root = null;
    //插入节点的方法(递归)
    var insertNode = function(node,newNode){
        
        if(newNode.value < node.value){
            if(node.left ===null){
                node.left = newNode;
            }else{
                insertNode(node.left,newNode);
            }
        }else{
            if(node.right ===null){
                node.right = newNode;
            }else{
                insertNode(node.right,newNode);
            }
        }
    }
    //创建新节点，判断开启上边的递归方法
    this.insert = function(val){
        var newNode = new Node(val);
        if(this.root == null){
            this.root = newNode;//终止操作
        }else{
            insertNode(this.root,newNode);
        }
    }
    //中序排序，中间节点输出在中间
    var middleOrderTraverseNode = function(node,callback){
        if(node!=null && node!=undefined){
            middleOrderTraverseNode(node.left,callback);
            callback(node.value);
            middleOrderTraverseNode(node.right,callback);
        }
    }
    this.middleOrderTraverse = function(callback){
       middleOrderTraverseNode(this.root,callback);
    }

    //先序排序，中间节点前边输出
    var preOrderTraverseNode = function(node,callback){
        if(node !== null && node !== undefined){
          callback(node.key);
          preOrderTraverseNode(node.left,callback);
          preOrderTraverseNode(node.right,callback);
        }
    }
    this.preOrderTraverse = function(callback){
        preOrderTraverseNode(this.root,callback);
    }

    //后续排序，中间节点后边输出
    var postOrderTraverseNode = function(node,callback){
        if(node !== null && node !== undefined){
          postOrderTraverseNode(node.left,callback);
          postOrderTraverseNode(node.right,callback);
          callback(node.key);
        }
    }
    this.postOrderTraverse = function(callback){
        postOrderTraverseNode(this.root,callback);
    }

    //二叉树查找指定的值
    //查找和其它值又有区别，insert之类的总会自动停止
    //查找不让它停止的话他会一直循环下去
    /*===================================
    查询类的特别适合尾递归，这里讲下尾递归和非尾递归的区别
    function story() {    
        从前有座山，山上有座庙，庙里有个老和尚，一天老和尚对小和尚讲故事：story() // 尾递归，
        进入下一个函数不再需要上一个函数的环境了，得出结果以后直接返回。
    }
    function story() {
        从前有座山，山上有座庙，庙里有个老和尚，一天老和尚对小和尚讲故事：story()，
        小和尚听了，找了块豆腐撞死了 // 非尾递归，
        下一个函数结束以后此函数还有后续，所以必须保存本身的环境以供处理返回值。
    }
    so:查询的时候特别适合用尾递归，因为一旦找到不需要后边的环境，再像上边一样加上一些边界判断
    =====================================*/
    var searchNode = function(node,val){
        if(node != null && node !=undefined ){
            if(val<node.value){
               return searchNode(node.left,val);
            }else if(val>node.value){
                return searchNode(node.right,val);
            }else{
                //如果相等
                return node;
            }
        }else{
            //==如果等于null，返回false==
            return false;
        }
    }
    this.search = function(val){
        return searchNode(this.root,val);
    }

    //查找二叉树的最小值
    //查找最小值我们是往最左边查
    var minNode = function(node){
        if(node == null){
            return null;
        }
        if(node.left == null){
            return node.value;
        }else{
            return minNode(node.left);
        }
    }
    this.min = function(){
        return minNode(this.root);
    }

    //查找最大值
    var maxNode = function(node){
        if(node){
            if(node.right){
                return maxNode(node.right);
            }else{
                return node.value;
            }
        }
    }
    this.max = function(){
        return maxNode(this.root);
    }

    //查找右侧最小节点，给delete使用
    var findMinNode = function(node){
        if(node){
            while(node.left){
                node = node.left;                
            }
            return  node;
        }
        return null;
    }
    //删除节点
    var deleteNode = function(node,val){

        if(node!=null || node !=undefined){
            //如果值小于node.value
            if(val<node.value){
                return deleteNode(node.left,val);
            }
            //如果大于，往右边寻找
            else if(val> node.value){
                return deleteNode(node.right,val);
            }
            //如果正好相等，就是我们操作的时候了
            else{
                //当节点为叶子节点的时候
                if(node.left == null 
                    && node.right == null){
                    //node = null;//并不能删除节点
                    node.value = null;
                    return true;
                }
                //当前的左子树或者右子树为空的时候，通过改变指向删除
                if(node.left == null){
                    node = node.right;
                    return true;
                }else if(node.right == null){
                    node = node.left;
                    return true;
                }
                
                //当左右节点都不为空的时候,从右边找一个最小的，放在这里
                var aux = findMinNode(node.right);
                node.value = aux.value;//将右边的最小值的值赋值到这个位置
                //然后递归去改变右侧最小值的指向，将整体填充好
                return deleteNode(node.right,aux.value);
            }
        }else{
            return false;
        }
    }
    this.delete = function(val){
        return deleteNode(this.root,val);
    }


}

/* let bt = new BinaryTree();
bt.insert(35);
bt.insert(44);
bt.insert(90);
bt.insert(45);
bt.insert(100);
bt.insert(2);
console.log("min",bt.min());
console.log("max",bt.max());

bt.middleOrderTraverse((val)=>{
    console.log("val",val);
});
console.log("search",bt.search(45));
console.log("delete",bt.delete(45));
console.log("delete",bt.delete(45));
console.log(JSON.stringify(bt)); */

module.exports = BinaryTree;