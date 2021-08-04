/*
实际上二叉树的遍历我们在写6-0-tree-二叉树及其设计.js的时候，
就已经写过了，我们这一节主要是在复习一下递归
每次写递归可以，都按照这三个要素写，可以保证大家写出正确的递归算法
1. 确定递归函数的参数和返回值
    确认哪些参数是递归的过程中需要处理的，那么就在递归函数里加上这个参数，
    并且明确每次递归的返回值是什么进而确定递归函数的返回类型
2. 确定终止条件
    写完了递归算法，运行的时候，经常会遇到栈溢出的错误，
    就是没写终止条件或是终止条件写的不对，操作系统也是用一个栈的结构
    来保存没一层递归的信息，如果递归没有终止，操作系统的内存栈必然就会溢出
    写实例的时候主要遇到两点：
    (1)如果是查询和删除，可以用尾递归，这样如果找到后边的环境变量就不用管了
    (2)如果是其它递归添加之类的，可以在后边判断null，然后再return

3. 确定单层递归的逻辑
    确定每一层递归需要处理的信息，在这里也会重复调用自己以实现递归的过程

前序遍历-把中间节点放在前边
中序遍历-把中间节点放在中间
后序遍历-把中间节点放在后边输出

因为要构建二叉树，所以我们把上一节写的bt类给拿过来在这里用

*/

let BinaryTree = require("qc-binarytree").default;
let bt = new BinaryTree();
bt.insert(30);
bt.insert(40);
bt.insert(23);
bt.insert(100);
bt.insert(5);
console.log("JSONS",JSON.stringify(bt.root));

//前序遍历
var preorderTraversal = function(root,res=[]){
    //判断了边界条件
    console.log("root",root)
    if(!root) return res;
    res.push(root.value);
    preorderTraversal(root.left,res);
    preorderTraversal(root.right,res);
    return res;
}

let res =  preorderTraversal(bt.root,[]);
console.log(res)

//中序遍历
var inorderTraversal = function(root,res=[]){
    if (!root) return res;
    inorderTraversal(root.left, res);
    res.push(root.val);
    inorderTraversal(root.right, res);
    return res;
}

//后序遍历
var postorderTraversal = function(root, res = []) {
    if (!root) return res;
    postorderTraversal(root.left, res);
    postorderTraversal(root.right, res);
    res.push(root.val);
    return res;
};