/*==================================================
数组就是一个简单哈希表，
但是要注意有限数据的时候才能用数组
因为数组的大小可不是无限开辟的
---
首先我们了解一下字母异位词是什么意思
字母异位词是指字母相同，但是排列不同的字符串

===================================================*/

/* 题目：
给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。
示例 1: 输入: s = "anagram", t = "nagaram" 输出: true
示例 2: 输入: s = "rat", t = "car" 输出: false
说明: 你可以假设字符串只包含小写字母。
 */

//定义一个26位的数组，先填充为0，
//index等于0的地方对应为a，然后依次下标和值对应
//第一个数组对对应位置做加法，
//第二个数组对对应位置做减法
//如果最终结果是全为0，就说明这两个词是异位词

var isAnagram = function(s,t){
    //如果两个数组长度不一致，我们返回为false
    if(s.length !== t.length) return false;
    //先设置一个有26个位置的数组，填充为0
    const resSet = new Array(26).fill(0);
    //在遍历字符串s的时候，
    //只需要将s[i] - ‘a’ 所在的元素做+1 操作即可
    //js是将a和其它字母换算成相同类型的数据做减法
    //来判断两者之间的距离定位其它字母，然后给对应字母位+1
    const base = "a".charCodeAt();
    for(const i of s){
        resSet[i.charCodeAt()-base]++;
    }
    for(const i of t){
        //if(!resSet[i.charCodeAt()-base]) return false;       
        resSet[i.charCodeAt()-base]-- ;
    }
    for(const i of resSet){
        if(resSet[i] != 0) return false;
    }
    return true;

}

var s = "anagram";
var t = "nagaram";
let result = isAnagram(s,t);
console.log(result);