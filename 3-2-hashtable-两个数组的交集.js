/*如果哈希值元素很少，跨度比较大，就会占用过多空间，
我们考虑用set
用数组来做哈希表也是不错的选择，
但是要注意，使用数组来做哈希的题目，
是因为题目都限制了数值的大小
而这道题目没有限制数值的大小，
就无法使用数组来做哈希表了
------
那有同学会问了？遇到hash问题我们直接用set不就得了
还用什么数组呀，
直接用set不仅占空间比数组大，而且速度要比数组慢
set将数值映射到key上都要做hash计算的
不要小瞧这个耗时，在数据量大的情况，差距是很明显的
*/

/*
给定两个数组，编写一个函数来计算它们的交集
let nums1 = [4,9,5]
let nums2 = [9,4,9,8,4]
输出 [2]
PS：输出结果中的每个元素是唯一的，
也就说明输出结果是去重的
我们可以不考虑输出结果的顺序
*/

//思路是先把一个去重，然后再和另外一个比较
var intersection = function(nums1,nums2){
    //根据数组大小交换操作的数组
    if(nums1.length < nums2.length){
        const _ = nums1;
        nums1 = nums2;
        nums2 = _;
    }
    //Set对象允许存储任何类型的唯一值，
    //无论是原始值还是对象引用
    //所以可以用它接收数组完成去重操作
    const nums1Set = new Set(nums1);
    //新建一个结果set
    const resSet = new Set();
    //然后用nums2的数据去和nums1的去重数据来比较
    for(let i = nums2.length-1 ;i >=0 ; i--){
        nums1Set.has(nums2[i])  && resSet.add(nums2[i])
    }
    //console.log(resSet); //Set(2) { 9, 4 }
    return Array.from(resSet);

}

let nums1 = [4,9,5,9]
let nums2 = [9,4,9,8,4]

let result =  intersection(nums1,nums2);
console.log("----",result);
