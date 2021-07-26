/* ===================================================

这里我们就要用到Map了
这里首先区分一下Map和Set
Map：是一组key：value键值对的结构，具有极快的查找速度。
Set：和Map类似，也是一组key的集合，但不存储value。在Set中，没有重复的key。
在java中，
HashMap解决key对应的hashCode取余之后的冲突的方法就是链地址法
而HashMap相当于对HashMap的一个封装使用，所以理论上也是链地址法

然后我们再看下对于这道题来说，数组和set的局限性
*数组的大小是受限制的，而且如果元素很少，而哈希值太大会造成内存空间的浪费。
*set是一个集合，里面放的元素只能是一个key，
    而两数之和这道题目，不仅要记录值还需要记录下标，
    因为要返回x 和 y的下标。所以set 也不能用。

=====================================================*/


/*
目标：
给定一个整数数组nums和一个目标值target，
请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。
你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

给定 nums = [2, 7, 11, 15], target = 9
因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1] */

//解题思路，寻找target-num[i]是否再map中
//map记录的方法是key是值，value是下标


var twoSum = function(nums,target){
    let hash = {};
    for(let i = 0; i < nums.length ; i++){
        //如果taget-num[i]对应的key存在
        //返回i下标，和对应taget-num[i]的下标
        if (hash[target - nums[i]] !== undefined) {
            return [i, hash[target - nums[i]]];
        }
        //值是key，下标是value
        hash[nums[i]] = i;
    }
    //如果没有，返回空数组
    return [];
}

let nums = [2, 7, 11, 15];
let target = 9;

let result = twoSum(nums,target);
console.log("result",result);







