/*
说一下时间复杂度
一次分两份，分出一个树，树的层数是
log以2为底n的对数，2^层数 = n;
每行又是n
所以整体时间复杂度应该是nlogn
归并排序和这个类似
*/
var quickSort = function(arr){
    //检查数组的元素个数，如果小于等于1，就返回
    if(arr.length <=1){return arr}
    //接着，选择基准，并将其与原数组分离，再定义两个空数组，用来存放一左一右两个子集
    var povotIndex = Math.floor(arr.length/2);
    //再定义两个空数组，用来存放一左一右的两个子集
    /*-------------------------------------------------------------------------------- 
    PS:splice
    splice，三个参数index何处？howmany多少？item1...itemX新增元素，可以删除一个增加两个
    返回值有两种类型，
    如果只是删除，返回的是删除的值
    如果删除后有添加，返回的是最终数组
    --------------------------------------------------------------------------------*/
    //从数组中拿到这个基准，作为后期的判断条件
    var pivot = arr.splice(povotIndex,1)[0];
    //然后准备左右两个数组
    var left = [];
    var right = [];

    //然后开始遍历数组，小于基准的放在左边的子集，
    //大于基准的元素放入右边的子集

    for(var i = 0; i< arr.length; i++){
        if(arr[i] < pivot){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }
    //最后对这个过程进行递归，然后左右分别递归并与当前基准合并
    //递归不断重复这个过程，就可以得到排序后的数组。
    return quickSort(left).concat(pivot,quickSort(right));
    
}


let result =  quickSort([1,3,5,23,123,3]);
console.log("--result--",result);






