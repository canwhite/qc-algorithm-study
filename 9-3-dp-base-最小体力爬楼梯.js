/*====================================================
数组的每个下标作为一个阶梯，
第i个阶梯对应着一个非负数的体力花费值cost[i]
下标从0开始。

每当你爬上一个阶梯你都要花费对应的体力值，
一旦支付了相应的体力值，
你就可以选择向上爬一个阶梯或者爬两个阶梯。

请你找出达到楼层顶部的最低花费。
在开始时，你可以选择从下标为 0 或 1 的元素作为初始阶梯。

示例 1：

输入：
cost = [10, 15, 20] 
输出：15 
解释：最低花费是从 cost[1] 开始，
然后走两步即可到阶梯顶，一共花费 15 。  

示例 2：

输入：cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1] 
输出：6 解释：最低花费方式是从 cost[0] 开始，逐个经过那些 1 ，跳过 cost[3] ，一共花费 6 。

提示：
cost 的长度范围是 [2, 1000]。
cost[i] 将会是一个整型数据，范围为 [0, 999] 。
---------------------------------------------------
思路：
注意题目描述：每当爬上一个楼梯你就要花费对应的体力值
，一旦支付了相应的体力值，
你就可以选择向上爬一层楼梯或者爬两层楼梯

所以示例1中只

我们可以选择从0或1作为初始台阶
示例1中我们选择1为初始台阶
花费一个15就可以到达阶梯顶，
最后一步可以理解为不用花费

读完题大家应该知道，指定需要动态规划的，贪心是不可能的

1.确定dp数组及其下标
使用动态规划,就要有一个数组来记录状态,
本题只需要一个一维数组dp[i]就可以了
dp[i]的定义:到达第i个台阶所花费的体力为dp[i]
这个认知是第一步，一定要花费时间理解

2.确定递推公式
首先，可以有两种途径得到dp[i]，一个是dp[i-1]
一个是dp[i-2]
那么是dp[i-1]还是dp[i-2]呢？
一定要选最小的。
所以
dp[i]= min(dp[i-1],dp[i-2]) + cost[i]
注意这里为什么要加cost[i]
而不是cost[i-1],cost[i-2]之类的，
因为题目中说：
每当你爬上一个阶梯，你都要花费对应的体力值


3.dp数组如何初始化
根据dp数组的定义，dp数组初始化其实是比较难的，
因为不可能初始化为第i台阶所花费的最少体力
那么看一下递归公式，
dp[i]由dp[i-1]，dp[i-2]推出
，既然初始化所有的dp[i]是不可能的，
那么初始化dp[0]和dp[1]就够了
所以初始化代码为dp[0]=0;dp[1]=1

4.确定遍历顺序
因为是模拟台阶，而且dp[i]由dp[i-1]和dp[i-2]推出
所以是从前到后遍历cost数组就可以了。
但是稍微有点难度的动态规划，其遍历顺序不容易确定下来

5.举例推导dp数组
拿示例2：cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1] ，
来模拟一下dp数组的状态变化

========================================================*/
//一般实现,但是这种很好理解
var miniCostClimbingStairs = function(cost){
    var dp = [];
    dp[0] = cost[0];
    dp[1] = cost[1];
    for(var i = 2;i<cost.length;i++){
        dp[i] = Math.min(dp[i-1],dp[i-2]) + cost[i];
    }
    //注意最后一步可以理解为不用花费，
    //所以取倒数第一步、第二步的最少值
    return Math.min(dp[cost.length-1],dp[cost.length-2]);
}

var cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1];
let result =  miniCostClimbingStairs(cost);
console.log("----",result);

//还可以优化空间复杂度，因为dp[i]就是由前两位推出来的，那么也不用dp数组了
var miniCostClimbingStairs1 = function(cost){
    var dp0 = cost[0];
    var dp1 = cost[1];
    for(var i=2;i<cost.length;i++){
        var dpi = Math.min(dp0,dp1) + cost[i];
        //更新一下前两位
        dp0 = dp1;
        dp1 = dpi;
    }
    return Math.min(dp0,dp1);
}
let result1 = miniCostClimbingStairs1(cost);
console.log("----",result1);

/*
拓展：
这道题描述也确实魔幻
题目描述为：
每当你爬上一个阶梯你就要花费对应的体力值，
一旦支付了相应的体力值，你就可以选择向上爬一个阶梯或者爬两个阶梯。
示例1：
输入：cost = [10, 15, 20] 输出：15
从题目描述可以看出：
要不是第一步不需要花费体力，
要不就是第最后一步不需要花费体力，
我个人理解：
题意说的其实是第一步是要支付费用的！。
因为是当你爬上一个台阶就要花费对应的体力值！

所以我定义的dp[i]意思是也是第一步是要花费体力的，
最后一步不用花费体力了，因为已经支付了。

当然也可以样，定义dp[i]为:
第一步是不花费体力，最后一步是花费体力的。
实际上我也比较认同这种
*/

var miniCostClimbingStairs2 = function(cost){
    var dp = [];
    dp[0] = 0; // 默认第一步都是不花费体力的
    dp[1] = 0;
    //console.log(cost.length);//10
    //会加到等于cost.length那一步，因为最后一步为闭
    for (var i = 2; i <= cost.length; i++) {
        dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
    }
    //console.log(dp.length);//11
    return dp[cost.length];
} 
let result2 = miniCostClimbingStairs2(cost);
console.log("----",result2);

