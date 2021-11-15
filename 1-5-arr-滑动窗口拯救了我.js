
/* 
题目------------------------------------ 
求长度最小的子数组
给定一个含有 n 个正整数的数组和一个正整数 s ，
找出该数组中满足 
----其和 ≥ s  的长度最小的连续子数组，
并返回其长度。
如果不存在符合条件的子数组，返回 0。

示例：

输入：
s = 7,
 nums = [2,3,1,2,4,3] 
输出：2 解释：子数组 [4,3] 是该条件下的长度最小的子数组。
 */

/*
思路-----------------------------------
这道题暴力解法当然是两个for循环，
然后不断的寻找复合条件的子序列，
时间复杂度很明显是O(n^2) 。

这里主要就在于两个循环，符合条件
*/



//给定数组nums和和一个和值s，求满足
let minSubArrayLen = (s,nums)=>{
    
    let sum = 0; //子序列的数值之和
    let subLength = 0;// 子序列的长度
    let result = Infinity;//最终的结果

    for(let i = 0; i<nums.length ; i++){
        //单个循环初始化
        sum = 0;
        for(let j = i; j<nums.length ; j++){
            sum+=nums[j];//累加
            if(sum >= s){
                //获取子序列长度
                subLength = j-i+1;//可以用i==j的特例考虑
                result = result <subLength?result:subLength;
                //找到符合条件的子序列，就跳出当前循环
                break;
            }
        }
    }

    //等于无穷大，说明没赋值，就返回0，否则就返回最终结果
    return result == Infinity ? 0 :result;
}

let result = minSubArrayLen(7,[2,3,1,2,4,3]);
console.log("--result--",result);

/*-----------------------------------------------------------------
for循环暴力破解，满足某些习惯
这里我们主要讲一种滑动窗口，
所谓滑动窗口，就是不断的调整子序列的起始位置和终止位置，从而得到我们想要的结果

其实如果看动画可以看出，滑动窗口也可以理解为双指针法的一种！
只不过这种揭发更像是一个窗口的移动，
所以叫做滑动窗口更适合一些

在本题中实现滑动窗口，主要确定如下三点：


--
1.窗口内是什么？
2.如何移动窗口的起始位置？
3.如何移动窗口的结束位置？

---
* 窗口就是 满足其和 ≥ s 的长度最小的 连续 子数组。

---
* 窗口的起始位置如何移动：
如果当前窗口的值大于s了，窗口就要向前移动了（也就是该缩小了）。

---
* 窗口的结束位置如何移动：
窗口的结束位置就是遍历数组的指针，窗口的起始位置设置为数组的起始位置就可以了。

代码的精髓就在于动态调整窗口的起始位置

while(sum >= s ){
    subLength = (j-i + 1);//取子序列的长度
    result = result < subLength ? result:subLength;
    sum -= nums[i++];//精髓就在于此处，先将当前的i减去，缩小窗口的大小，然后再++，变换起点位置

}
一些录友会疑惑为什么时间复杂度是O(n)。

不要以为for里放一个while就以为是$O(n^2)$啊，
主要是看每一个元素被操作的次数，
每个元素在滑动窗后进来操作一次，出去操作一次，每个元素都是被被操作两次，
所以时间复杂度是2 * n 也就是$O(n)$。
------------------------------------------------------------------*/
//其和 ≥ s  的长度最小的连续子数组
let minSubArrayLength = (s,nums)=>{
    let result = Infinity;
    let sum = 0;//滑动窗口数值之和
    let l = 0;//左侧
    let cnt = 0;//滑动窗口的长度

    for(let r=0;r<nums.length;r++){

        //r是正常走的
        sum += nums[r];
        //只有sum >=s满足，我们就可以一直让l去滑动，但是r是暂时固定的
        //直到不满足这个条件
        while(sum >=s){
            //取子序列的长度
            cnt = r-l+1;
            //我们取得是最小连续数组
            result = Math.min(cnt,result);
            //精髓就在于此处，先将当前的i值减去，缩小窗口的大小，然后再++，变换起点位置
            sum -= nums[l++];
        }
    }
    //如果result没有被赋值，就返回0，说明没有符合条件的子序列
    return result == Infinity ? 0 :result;
}


let result1 = minSubArrayLength(7,[2,3,1,2,4,3]);
console.log("--result--",result1);