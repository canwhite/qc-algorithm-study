/*
这是神光面试的一道题，拿来玩耍
题目----------------------------------------
输入是 1,2,3,5,7,8,10 输出要求是 1~3 5 7~8 10
这明显是求连续区间，然后格式化成字符串
这道题有点类似于滑动视窗

然后主要的问题就是如何判断连续？
当arr[i+1]是arr[i]+1的时候，那就是连续的，需要继续往下找，
否则就到了区间的边界，记录下区间的起始位置就行

*/

var calcRanges = (arr)=>{
    let ranges = [];
    let index = 0;
    //外层循环
    for(let index = 0; index < arr.length ; index++){
        //循环内的操作，这里先初始化值
        const range = {
            start:arr[index],
            end:arr[index]
        }
        //内部又加了一层循环
        //如果中间又连续的数字，那么区间的end要做一下调整
        while(index<arr.length &&  arr[index + 1] === arr[index] +1){
            //给end重新赋值
            range.end = arr[index + 1];
            index ++;//改变开头，有点类似与滑动视窗
        }
        ranges.push(range);
    }
    // console.log(ranges); //输出一下区间数组
    //然后在这里将输出结果格式化
    const formatted = ranges.map(({start,end})=>{
        return start === end ? start : `${start}~${end}`;
    }).join(" ")
    console.log(formatted);
}

calcRanges([1,2,3,5,7,8,10]);