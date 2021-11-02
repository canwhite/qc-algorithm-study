/*
题目------------------------------------------

在上次打劫完一条街道之后和一圈房屋后，
小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，
我们称之为“根”。 
除了“根”之外，每栋房子有且只有一个“父“房子与之相连。
一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。
 如果两个直接相连的房子在同一天晚上被打劫，房屋将自动报警。

计算在不触动警报的情况下，小偷一晚能够盗取的最高金额。

思路-----------------------------------------
这道题的区别在于把之前的问题换成了树
对于树的话，首先就要想到遍历方式，
前中后序（深度优先搜索）还是层序遍历（广度优先搜索）。

本题一定是要后序遍历，因为通过递归函数的返回值来做下一步计算。
与198.打家劫舍，213.打家劫舍II一样，关键是要讨论当前节点抢还是不抢。
如果抢了当前节点，两个孩子就不是动，如果没抢当前节点，
就可以考虑抢左右孩子（注意这里说的是“考虑”）

动态规划五部曲----------------------------------

而动态规划其实就是使用状态转移容器来记录状态的变化，这里可以使用一个长度为2的数组，
记录当前节点偷与不偷所得到的的最大金钱。

这道题目算是树形dp的入门题目，因为是在树上进行状态转移，
我们在讲解二叉树的时候说过递归三部曲，
那么下面我以递归三部曲为框架，其中融合动规五部曲的内容来进行讲解。

1.确定递归函数的参数和返回值--------------------

这里我们要求一个节点 偷与不偷的两个状态所得到的金钱，那么返回值就是一个长度为2的数组。
参数为当前节点，代码如下：
vector<int> robTree(TreeNode* cur) {...}
其实这里的返回数组就是dp数组。

所以dp数组（dp table）以及下标的含义：
下标为0记录不偷该节点所得到的的最大金钱，下标为1记录偷该节点所得到的的最大金钱。

所以本题dp数组就是一个长度为2的数组！
那么有同学可能疑惑，长度为2的数组怎么标记树中每个节点的状态呢？
别忘了在递归的过程中，系统栈会保存每一层递归的参数。



2.确定终止条件---------------------------------

在遍历的过程中，如果遇到空节点的话，很明显，无论偷还是不偷都是0，所以也返回数组[0,0]
if (cur == NULL) return vector<int>{0, 0};
这也相当于dp数组的初始化


3.确定遍历顺序---------------------------------

首先明确的是使用后序遍历。 因为通过递归函数的返回值来做下一步计算。

通过递归左节点，得到左节点偷与不偷的金钱。

通过递归右节点，得到右节点偷与不偷的金钱。

代码如下：

// 下标0：不偷，下标1：偷
vector<int> left = robTree(cur->left); // 偷左边返回的数组
vector<int> right = robTree(cur->right); // 偷右边返回的数组
// 然后跑中间


4.确定单层递归的逻辑----------------------------

如果是偷当前节点，那么左右孩子就不能偷，val1 = cur->val + left[0] + right[0]; 
（如果对下标含义不理解就在回顾一下dp数组的含义）

如果不偷当前节点，那么左右孩子就可以偷，至于到底偷不偷一定是选一个最大的
所以：val2 = max(left[0], left[1]) + max(right[0], right[1]);
最后当前节点的状态就是{val2, val1}; 
即：{不偷当前节点得到的最大金钱，偷当前节点得到的最大金钱}

代码如下：

vector<int> left = robTree(cur->left); // 左
vector<int> right = robTree(cur->right); // 右

// 偷cur
int val1 = cur->val + left[0] + right[0];
// 不偷cur
int val2 = max(left[0], left[1]) + max(right[0], right[1]);
return {val2, val1};


5.举例推导dp数组-------------------------------

先从树杈开始，偷，不偷
然后回到中间


*/


//首先是暴力递归-----------------
//偷父节点或者不偷父节点实际上都过了一遍孙子节点
let rob = (root)=>{
    //主要关注偷父节点和不偷父节点
    if(root == null) return 0;
    //如果偷父节点
    let money = root.val;
    //如果偷了父节点，就需要去孙子辈儿了，不考虑左孩子的情况
    if(root.left){
        money += rob(root.left.left) + rob(root.left.right);
    }
    //不考虑右孩子的情况
    if(root.right){
        money += rob(root.right.left) + rob(root.right.right);
    }
    //如果不偷父节点,偷两边子节点
    let money_c = rob(root.left) + rob(root.right);
    //最后返回两种情况较大的值
    return Math.max(money,money_c);
}

//然后是记忆化递归---------------
//通过缓存记忆孙子节点是否被遍历过了

//1.-----多了memory的定义
var memory = {};
let rob1 = (root)=>{
    if(root == null) return 0;
    if(root.left == null && root.right == null) return root.val;
    //2.-----多个memory在具体行为前的判断操作
    if(memory.hasOwnProperty(root) && memory[root] != null) return memory[root];
    //偷父节点
    let money = root.val;
    //如果偷了父节点，就需要去孙子辈儿了，不考虑左孩子的情况
    if(root.left){
        money += rob(root.left.left) + rob(root.left.right);
    }
    //不考虑右孩子的情况
    if(root.right){
        money += rob(root.right.left) + rob(root.right.right);
    }
    //不偷父节点
    let money_c = rob(root.left) + rob(root.right);
    //3.-----多了memory的存值操作
    memory[root] = max(money, money_c)
    //返回最大值
    return max(money,money_c);

}

//最后是动态规划-----------------
//一个数组，两种状态的收获，index==0，是不偷的收获，index==1是偷的收获
let rob2 = (root)=>{
    let result = rob_tree(root);
    //如果最后还要返回值，那就加return
    return max(result[0],result[1]);
}
let rob_tree = (node)=>{
    //这里和讲解的有些微不同，
    //index==0是偷当前节点，index==1是不偷当前节点
    if(node ==null) return [0,0];
    //无论是left和right，都有偷和不偷两种情况
    let left = rob_tree(node.left);
    let right = rob_tree(node.right);

    //偷当前节点，不能不能偷子节点
    let val1 = node.val + left[1] + right[1];

    //不偷当前节点，可偷可不偷子节点
    let val2 = max(left[0],left[1]) + max(right[0] + right[1]);

    return (val1,val2);
}