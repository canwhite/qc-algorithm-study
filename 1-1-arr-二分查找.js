/*=====================================================
给定一个n个元素有序的（升序）整型数组nums和一个目标值target  
写一个函数搜索nums中的 target，
如果目标值存在返回下标，否则返回 -1。 */

/* 输入: nums = [-1,0,3,5,9,12], target = 9     
输出: 4       
解释: 9 出现在 nums 中并且下标为 4   

这道题目的前提是数组为有序数组,同时题目中还强调数组中无重复元素
因为一旦有重复元素，使用二分查找返回的元素下标可能不是唯一的
所以使用二分法的前提条件
* 有序
* 无重复

大家写二分法经常写错的原因：
主要因为对区间的定义没有想清楚，
区间的定义就是不变量，要在二分查找的过程中，保持不变量。
就是在while寻找中每一次边界的处理都要坚持根据区间的定义来操作，
这就是循环不变量规则。

区间的定义一般为两种，
左闭右闭即[left, right]，或者左闭右开即[left, right)。

下面我用这两种区间的定义分别讲解两种不同的二分写法。



=====================================================*/

/*
第一种写法，
我们定义 target 是在一个在左闭右闭的区间里，也就是[left, right] （这个很重要非常重要）。

区间的定义这就决定了二分法的代码应该如何写，
因为定义target在[left, right]区间，所以有如下两点：

*while (left <= right) 要使用 <= ，因为left == right是有意义的，所以使用 <=
*if (nums[middle] > target) right 要赋值为 middle - 1，
因为middle位置的数据确定是不行，左边类似

*/

//我愿称这种方法为明确边界法，比第二种更好理解
var search = function(nums,target){
    //先确定初始的左边和右边坐标
    let l = 0, r = nums.length -1;
    //这个取中运算特别棒，我试了一下01(1)+11(3) = 100(4),右移一位正好是10,也就是2
    //区间[l,r]
    while(l<=r){
        let mid = (l+r) >> 1; //得到中间值
        //先判断中间边界
        if(nums[mid]===target) return mid;
        //然后判断左右，边界已经判断过了，注意减1，重新判断边界
        let isSmall = nums[mid] < target;//如果满足说明在右边，以下思路都基于此
        //重新定义边界
        l = isSmall ? mid+1 :l;//如果是右边大，左边界从中间靠右挪一位
        r = isSmall ? r :mid-1;//如果右边大，右边界还是之前的位置
    }
    return -1;
}

//测试一下
let nums = [-1,0,3,5,9,12], target = 9 ;
let result1 =  search(nums,target);
console.log("result1",result1);


/*
第二种写法
如果说定义 target 是在一个在左闭右开的区间里，也就是[left, right) ，
那么二分法的边界处理方式则截然不同

* while (left < right)，这里使用 < ,因为left == right在区间[left, right)是没有意义的
* if (nums[middle] > target) right 更新为 middle，
因为当前nums[middle]不等于target，去左区间继续寻找，而寻找区间是左闭右开区间，所以right更新为middle，即：下一个查询区间不会去比较nums[middle]

*/

let search2 = function(nums,target){
    //左右坐标初始化
    let l= 0,r = nums.length;//因为右边是开的，所以不用减1，最后一位也不参与计算
    //区间
    while(l < r){
        //取中间
        let mid = (l+r) >>1;
        //如果中间正好是则返回中间
        if(nums[mid] === target) return mid;
        let isSmall = nums[mid] < target;//这里判断是否满足在右边
        l = isSmall ? mid+1 :l;
        r = isSmall ? r:mid;//mid相当于那个开，因为循环是<,是虚的，所以不参与判断
    }
    return -1;
}
let result2 =  search2(nums,target);
console.log("result2",result2);
