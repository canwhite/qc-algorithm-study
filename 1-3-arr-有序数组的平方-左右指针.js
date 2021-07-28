/* 
给你一个按非递减顺序排序的整数数组nums，
返回每个数字的平方组成的新数组，要求也按非递减顺序排序。

示例 1： 
输入：nums = [-4,-1,0,3,10] 
输出：[0,1,9,16,100] 
解释：平方后，数组变为 [16,1,0,9,100]，
排序后，数组变为 数组变为 [0,1,9,16,100] */

/*
解决方案一：暴力破解
最暴力的方法莫过于，根据特征，平方产生新数组，然后再排序*/

let sortedSquares = (a)=>{
    let array =  a.map((item)=>item*item);
    array.sort((a,b)=>{
        return a-b;
    })
    return array;
}
let a = [-4,-1,0,3,10];
let result1 =  sortedSquares(a);
console.log("result1",result1);


/*
解决方案二：双指针法
双指针法适合两头往中间夹得情况
数组其实是有序的， 只不过负数平方之后可能成为最大数了。
那么数组平方的最大值就在数组的两端，不是最左边就是最右边，不可能是中间。
此时可以考虑双指针法了，i指向起始位置，j指向终止位置。
定义一个新数组result，和A数组一样的大小，让k指向result数组终止位置。
如果A[i] * A[i] < A[j] * A[j] 那么result[k--] = A[j] * A[j]; 。
如果A[i] * A[i] >= A[j] * A[j] 那么result[k--] = A[i] * A[i]; 。
*/
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
let result2 =  sortedSquares2(a);
console.log("result1",result2);