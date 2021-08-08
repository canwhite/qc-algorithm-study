/*---------------------------------------------------
给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
你可以按 任何顺序 返回答案。
输入：n = 4, k = 2
输出：
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
实际上这个题在上一节已经做过了，
在这里针对减枝，
我们再进行一次

接下来看一下优化过程如下：

已经选择的元素个数：path.size();

还需要的元素个数为: k - path.size();

在集合n中至多要从该起始位置 : n - (k - path.size()) + 1，开始遍历

为什么有个+1呢，因为包括起始位置，我们要是一个左闭的集合。

举个例子，n = 4，k = 3， 目前已经选取的元素为0（path.size为0），n - (k - 0) + 1 即 4 - ( 3 - 0) + 1 = 2。

从2开始搜索都是合理的，可以是组合[2, 3, 4]。

这里大家想不懂的话，建议也举一个例子，就知道是不是要+1了。

----------------------------------------------------*/

var combine = function(n,k){
  const res=[],path=[];
  backtracking(n,k,1);
  return res;
  //写一个内部函数，实际上在内在外没啥大的区别
  function backtracking(n,k,i){
    const len = path.length;
    if(len ===k){
      //依托path，创建数组，然后再push
      res.push(Array.from(path));
      return;
    }
    for(let a=i;a<=n+len-k+1;a++){
      path.push(a);
      backtracking(n,k,a+1);
      path.pop();
    }
  }
}

let res = combine(4,2);
console.log("----",res);