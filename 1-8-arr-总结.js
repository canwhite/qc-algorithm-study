/*
理论基础：------------------------------------------
数组在内存中的存储方式：
数组是存放在连续内存空间上的相同类型数据的集合。
数组可以方便的通过下标索引的方式获取到下标下对应的数据。

需要注意两点：
1.数组下标都是从0开始的
2.数组内存空间的地址是连续的

正是因为数组在内存空间的地址是连续的，所以我们在删除或者增添元素的时候，
就难免要移动其他元素的地址
例如删除下标为3的元素，就需要对下标为3的元素后边的所有元素做移动操作

数组的元素是不能删的，只能覆盖

那么二维数组是连续的空间吗？
所以二维数组在内存中不是3*4的连续地址空间，
而是三条连续的空间组合在一起，每条四个


数组的经典题目：-------------------------------------------------





1.二分法---------------------------------------------------------

在这道题目中我们讲到了循环不变量原则，只有在循环中坚持对区间的定义，才能清楚的把握循环中的各种细节。

二分法是算法面试中的常考题，建议通过这道题目，锻炼自己手撕二分的能力。

示例，在一个数组中查找出target
let search = function(nums,target){
    let l= 0,r = nums.length;//因为右边是开的，所以不用减1，最后一位也不参与计算
    //区间左闭右开[)
    while(l < r){
        //取中间
        let mid = (l+r) >>1;
        //如果中间正好是则返回中间
        if(nums[mid] === target) return mid;
        let isRight = nums[mid] < target;//这里判断是否满足在右边
        l = isRight ? mid+1 :l;//因为mid判断过了，且左边是实的
        r = isRight ? r:mid;//mid相当于那个开，因为循环是<,是虚的，所以不参与判断
    }
    return -1;
}
let result =  search(nums,target);
console.log("result",result);







2.双指针之快慢指针----------------------------------------------------

双指针法
双指针法，又称为快慢指针法，
通过一个快指针和一个慢指针在一个for循环下完成两个for循环的工作

快慢指针法的意义在于，慢指针指向值，快指针完成操作变化


示例 1: 给定 nums = [3,2,2,3], 移除val = 3, 
函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。 
你不需要考虑数组中超出新长度后面的元素。

removeElement = (nums,val)=>{
    let slowIndex = 0;
    for(let fastIndex = 0; fastIndex<nums.length ; fastIndex ++){
        //快指针没有发现目标值，慢指针是加的；并且是赋值的
        //但是如果快指针发现了目标值，慢指针就会停下，并且不赋值，
        //最后返回的是慢指针的index；
        if(val != nums[fastIndex]){
            //如果slowIndex就会停一下,出现了快慢异位，完成交换工作
            nums[slowIndex ++] = nums[fastIndex];
        }
    }
    return slowIndex;
}




3.双指针之左右指针-------------------------------------------------------------

这种解决平方问题是很合适的，
因为这种需要从两边往中间夹，两边的大，中间的小
左右指针和快慢指针一样，都可以使用一个for循环
一个i在前，一个j在尾，然后只要满足i <= j,就可以持续变化
将左右指针的移动在逻辑块儿中进行

let sortedSquares2 = nums=>{
    //首先放一个空的结果数组
    let res = [];
    //i从头部，j从尾部，i和j的增减自己完成，i<=j;
    //当i==j的时候实际上是一个开放空间，虚的，因为不判断这种情况，所以等于是同一个值得情况不判断 
    for (let i = 0, j = nums.length - 1; i <= j;) {
        const left = Math.abs(nums[i])
        const right = Math.abs(nums[j])
        //一个从左，一个从右，构建新数组，从后往前加
        if (right > left) {
            // push element to the front of the array
            res.unshift(right * right)
            j--;//后边的是自减
        } else {
            res.unshift(left * left)
            i++;//前边的是自加
        }
    }
    return res
}





4.双指针之固定间距指针---------------------------------------------------------
对一个字符串，在给定范围的长度里，最多有几个元音字符

Input: s = "abciiidef", k = 3
Output: 3
Explanation: The substring "iii" contains 3 vowel letters.









5.滑动窗口---------------------------------------------------------------------
有某个判断标准，满足的时候记录并滑动
这和上边的固定间距指针又有区别，是动态的间距

let minSubArrayLength = (s,nums)=>{
    let result = Infinity;
    let sum = 0;//滑动窗口数值之和
    let i = 0;//滑动窗口起始位置
    let subLength = 0;//滑动窗口的长度

    for(let j=0;j<nums.length;j++){

        //sum是滑动窗口数值之和
        sum += nums[j];

        //使用while循环，当出现满足的情况的时候，记录这种情况，然后再滑动
        while(sum >=s){
            //取子序列的长度
            subLength = j-i+1;
            //result是我们最终要返回的长度
            result = result < subLength ?result:subLength;
            //精髓就在于此处，先将当前的i值减去，缩小窗口的大小，然后再++，变换起点位置
            sum -= nums[i++];
        }
    }

    //如果result没有被赋值，就返回0，说明没有符合条件的子序列
    return result == Infinity ? 0 :result;
}





6.模拟行为---------------------------------------------------------------------








*/