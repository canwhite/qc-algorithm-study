/*-------------------------------------------------
分为两种：
* 线性查询，线性查询就一个个走，如果发现相等了就返回
* 二分查询
--------------------------------------------------*/

let arr = [1,3,4,5,2,4,2];



//线性查找是最简单的查找方式之一，匹配导出就可以了
function sequenceSearch(arr,value){
    for(let i = 0;i<arr.length;i++){
        if(arr[i]==value){
            return i;
        }
    }
    return -1;
}
console.log("ss",sequenceSearch(arr,2));



//注意这里有个问题是，二分查找只能查找排序好数据
var binarySearch = function(arr,value){
    let l = 0;
    let r = arr.length -1;
    //区间[l,r]
    while(l<=r){
        let mid = (l+r) >> 1; //得到中间值
        /* console.log("mid",mid) */
        if(arr[mid]==value) return mid;//如果满足则返回
        let isRight = arr[mid] < value;//是不是在右边
        //然后如果右边大，用正则分别给左右边界赋值
        l = isRight ? mid+1 :l;
        r = isRight ? r :mid-1;
    
    }
    return -1;
}

let arr1 = arr.sort();
/* [
    1, 2, 2, 3,
    4, 4, 5    
] */
console.log(arr1);
console.log("bs",binarySearch(arr1,2));


