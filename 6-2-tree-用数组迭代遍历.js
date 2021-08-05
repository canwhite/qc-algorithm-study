/*
为什么用迭代法(非递归的方式)来实现二叉树的前后中序遍历呢？
递归的实现就是：
每一次递归调用都会把函数的局部变量，参数值和返回地址
等压入调用栈中，然后递归返回的时候，从栈顶弹出上一次
递归的各项参数，所以这就是递归为什么可以返回上一层位置
的原因
这个调用栈的机制和数组一样
*/

//前中后遍历的前中后是形容词，指的是根节点的位置

/*-----------------------
前序遍历
前序遍历是中左右，
每次先处理的是中间节点，我们先将根节点放入栈中，
然后将右孩子加入栈，再加入左孩子
为什么是先加入右孩子，再加入左孩子呢？
因为这样出栈的时候就是中、左、右

-----------------------*/
//入栈 右 -> 左
//出栈 中 -> 左 -> 右边

var preorderTraversal = function(root,res=[]){
    if(!root) return res;
    ////一开始是将root节点放进数组中
    /*----------------------------------------------------------
    [
        Node {
            value: 30,
            left: Node { value: 23, left: [Node], right: null },
            right: Node { value: 40, left: null, right: [Node] }
        }
    ]
    ------------------------------------------------------------*/
    const stack = [root];
    //然后下边节点单独处理
    let cur = null;
    while(stack.length){
        cur = stack.pop();
        //真正的push是从这里开始
        res.push(cur.value);
        cur.right && stack.push(cur.right);//push了之后，stack.length ==1,继续循环
        cur.left && stack.push(cur.left);
    }
    return res;
}


let BinaryTree = require("qc-binarytree").default;
let bt = new BinaryTree();
bt.insert(30);
bt.insert(40);
bt.insert(23);
bt.insert(100);
bt.insert(5);
console.log("JSONS",JSON.stringify(bt.root));


let res =  preorderTraversal(bt.root,[]);
console.log(res)

/*----------------------
中序遍历
中序遍历是左中右，
先访问的是二叉树顶部的节点，然后一层一层向下访问
知道到达树左边的最底部，再开始处理节点
(也就是把节点的数值放入result数组中)，这就造成它的处理
顺序和访问顺序和前序遍历是不一致的
那么在使用中序遍历，就需要借用指针的遍历来帮助访问节点，栈则用来处理节点上的元素
-----------------------*/
var inorderTraversal = function(root,res=[]){
    const stack = [];
    let cur = root;
    while(stack.length || cur){
        //
        if(cur){
            //先往里边添中->左->左->null
            stack.push(cur);
            cur = cur.left;
        }else{
            //然后pop左边(没有子right，所以又回到这里)->左边(中)->子右
            //这个步骤相当于往回退
            cur = stack.pop();
            res.push(cur.value);
            //右边
            cur = cur.right;
        }
    }
    return res;
}

let res1 = inorderTraversal(bt.root,[]);
console.log(res1)

/*----------------------
后序遍历
先序遍历是中左右，调整掉吗左右循序是，中右左，反转result数组就得到了左右中
后续遍历是左右中
也就是说，后续遍历实际上就是反转前序遍历的结果

-----------------------*/
var postorderTraversal = function(root,res=[]){
    const stack = [root];
    //然后下边节点单独处理
    let cur = null;
    while(stack.length){
        cur = stack.pop();
        //真正的push是从这里开始
        res.push(cur.value);
        cur.right && stack.push(cur.right);//push了之后，stack.length ==1,继续循环
        cur.left && stack.push(cur.left);
    }
    return res.reverse();
}

let res2 = postorderTraversal(bt.root,[]);
console.log(res2)