/*
给定一个整数数组 nums ，
找到一个具有最大和的连续子数组
（子数组最少包含一个元素），返回其最大和。

示例: 
输入: [-2,1,-3,4,-1,2,1,-5,4] 
输出: 6 
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。

现阶段看到的题的特征是，得出一个子序列而且还有一定的自由度

*/

/*=======================================
暴力解法的思路，第一层for就是设置起始位置
第二层for循环遍历数组寻找对大值
=========================================*/

var maxSubArray = (nums)=>{
    var result = 0;
    var count = 0;
    for(var i = 0; i<nums.length; i++){
        count= 0;
        // 每次从起始位置i开始遍历寻找最大值
        for(var j=i;j<nums.length;j++){
            count += nums[j];
            result = count > result?count:result;
        }
    }
    return result;
}

let result =  maxSubArray([-2,1,-3,4,-1,2,1,-5,4]);
console.log("----",result);

/*==========================================
贪心解法
贪心贪的是哪里呢?
如果-2 1在一起，计算起点的时候，一定是从1开始计算
因为负数只会拉低总和，这就是贪心贪的地方
--局部最优：--
当前“连续和”为负数的时候立即放弃，从下一个元素重新计算“连续和”
因为负数加上下一个元素“连续和”只会越来越小。
--全局最优：--
局部最优的情况下，并记录最大的“连续和”，可以推出全局最优
这相当于是暴力解法中的不断调整最大子序和区间的起始位置。
那有同学问了，区间终止位置不用调整么？ 
如何才能得到最大“连续和”呢？

区间的终止位置，其实就是如果count取到最大值了，
及时记录下来了。例如如下代码：
if (count > result) result = count;
这样相当于是用result记录最大子序和区间和
（变相的算是调整了终止位置）。

===========================================*/
var maxSubArray1 = function(nums){
    let result = -Infinity;//负无穷
    let count = 0;
    for(let i=0;i<nums.length;i++){
        count += nums[i];
        //如果count>reuslt的时候才更新
        if(count > result){
            result = count;
        }
        if(count < 0){
            count = 0;
        }
    }
    return result;

}
let result1 =  maxSubArray1([-2,1,-3,4,-1,2,1,-5,4]);
console.log("---",result1);