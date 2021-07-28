/*=================================================
先说以下双指针
双指针一共有两种，
快慢指针
左右指针
我们这里使用的是快慢指针


=================================================*/

/*
目标：
请实现一个函数，把字符串 s 中的每个空格替换成"%20"。
示例 1： 输入：s = "We are happy."
输出："We%20are%20happy." */


/*
思路：
先将数组扩容，然后从后往前使用快慢指针，从后往前填充
为什么要从后往前填充，从前往后填充不行吗？

从前向后填充就是O(n^2)的算法了
因为每次添加元素都是将添加元素之后的所有元素向后移动
------
其实很多数组填充类问题，都可以先预先给数组扩容到填充后的大小，然后从后往前进行操作
------
这样做的好处是
1.不用申请新数组
2.避免提升算法复杂度

*/

//js对数组扩容这个概念比较薄弱，所以我们使用python来实现这一思路


let replaceSpace = s =>{
    //记录原本字符串的长度
    let original_end = s.length;
    //记录空格数目
    let n_space = 0;
    //间隔数量需要-1
    n_space =  s.split(" ").length -1;
    console.log(n_space);
    //进行扩容
    for(let i = 0; i<n_space ; i++){
        s+="00";
    }
    //然后将字符串转化成数组
    console.log(arr);
    //设置左右指针位置
    let left = original_end-1;
    let right = arr.length -1;

    //循环直至左指针越界
    while(left >= 0){
        if(arr[left] == ' '){
            arr[right] = '0';
            arr[right-1] = "2";
            arr[right-2] = "%";
            right-=3;
        }else{
            arr[right] = arr[left];
            right-=1;
        }
        left-=1;
    }
    s = arr.join("");
    return s;
}
let s = "We are happy.";
const result =  replaceSpace(s);
console.log("result",result);