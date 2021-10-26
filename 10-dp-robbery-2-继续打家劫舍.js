/*
题目------------------------------------------------------
你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 围成一圈 ，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警 。

给定一个代表每个房屋存放金额的非负整数数组，计算你 在不触动警报装置的情况下 ，能够偷窃到的最高金额。

示例 1：

输入：nums = [2,3,2] 输出：3 解释：你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。

示例 2： 输入：nums = [1,2,3,1] 输出：4 解释：你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。偷窃到的最高金额 = 1 + 3 = 4 。

示例 3： 输入：nums = [0] 输出：0   提示：

1 <= nums.length <= 100
0 <= nums[i] <= 1000

思路------------------------------------------------------

这道题和上一个打家劫舍差不过，唯一区别就是成环了。
对于一个数组，成环的话主要有如下三种情况：
(1)情况一：考虑不包含首尾元素
(2)情况二：考虑包含首元素，不包含尾元素
(3)情况三：考虑包含尾元素，不包含首元素
注意我这里用的是"考虑"，例如情况三，虽然是考虑包含尾元素，
但不一定要选尾部元素！ 
对于情况三[1,6,1,9,1]，取nums[1] 和 nums[3]就是最大的。

而情况二 和 情况三 都包含了情况一了，
所以只考虑情况二和情况三就可以了。

*/

var rob = function(nums){
    const n = nums.length;
    if(n==0) return 0;
    if(n==1) return nums[0]
    //考虑两种模式
    //(1)考虑开头
    const result1 = robRange(nums,0,n-2);
    //(2)考虑尾巴
    const result2 = robRange(nums,1,n-1);
    return Math.max(result1,result2);
}

const robRange = (nums,start,end) =>{
    if(end == start) return nums[start];
    const dp = Array(nums.length).fill(0);
    //从dp[2]开始，初始化dp[0]和dp[1]的数据
    dp[start] = nums[start];
    dp[start+1] = Math.max(nums[start],nums[start+1]);//到1的时候，要考虑取首或者下一个
    for (let index = start+2; index <=end; index++) {
        //前两个可能取第一个或者第二个，所以往下想第三个依赖于前两个
        dp[index] = Math.max(dp[index-2]+nums[index],dp[index-1]);
    }
    return dp[end];
}
let result =  rob([1,6,1,9,1])
console.log("---",result);