/*
给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。
不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并原地修改输入数组。
元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。
示例 1: 给定 nums = [3,2,2,3], val = 3, 
函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。 你不需要考虑数组中超出新长度后面的元素。
*/

/*
思路总结：
快慢指针法的意义在于，慢指针指向值，快指针完成操作变化
*/

/*=====================================================================================
方法一：暴力破解
知道数组的元素在内存地址中是连续的，不能单独删除数组中的某个元素，只能覆盖，用后边覆盖前边的
所以，暴力破解的方法就是如果到某个位置发现了对应值，就将它删除；
其它对应的值就再开一个循环往前挪动
// 时间复杂度：O(n^2)
// 空间复杂度：O(1)
======================================================================================*/
removeElement= (nums,val)=>{
    let size = nums.length;
    for(let i = 0;i<size ; i++){
        //发现需要移除的数据，将数组通过循环集体向前移动一位
        if(nums[i]==val){
            //循环往前移动一位
            console.log("i:",i,"nums",nums);
            for(let j = i+1;j<size;j++){
                let k = j-1;//回到i的位置，覆盖赋值
                nums[k] = nums[j];
            }
            //压缩空间
            i--;
            size--;
        }
    }
    console.log("nums",nums);
    return size;
}

let nums = [3,2,2,3];
let val = 3;
let result1 =  removeElement(nums,val);
console.log("result1",result1); 

/*
方法二：双指针法
双指针法，又称为快慢指针法，
通过一个快指针和一个慢指针在一个for循环下完成两个for循环的工作
在数组和链表的操作中是比较常见的，很多考察数组、链表、字符串等操作的面试题
都使用双指针法
//时间复杂度O(n)
//空间复杂度O(1)
*/

removeElement2 = (nums,val)=>{
    let slowIndex = 0;
    for(let fastIndex = 0; fastIndex<nums.length ; fastIndex ++){
        //如果不是相等的值就伴随往前走，如果是相等的值，慢指针会停一停
        //然后出现快慢异位，完成交换操作，最后返回慢指针index;
        if(val != nums[fastIndex]){
            //如果相等的时候slowIndex就会停一下
            nums[slowIndex ++] = nums[fastIndex];
        }
    }
    return slowIndex;
}
let result2 =  removeElement2(nums,val);
console.log("result2",result2);



