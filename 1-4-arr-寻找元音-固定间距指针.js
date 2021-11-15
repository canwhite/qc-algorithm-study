/*
题目：
对一个字符串，在给定范围的长度里，最多有几个元音字符

Input: s = "abciiidef", k = 3
Output: 3
Explanation: The substring "iii" contains 3 vowel letters.


 */

//首先我们写个方法判断哪些是元音，找到一种最符合这种情况的解题方式



const maxVowels = (s,k)=>{
    const st = new Set(["a","e","i","o","u"]) ;
    let res = 0;
    let l = 0;//左侧
    let cnt = 0;

    for(let r = 0; r< s.length; r++ ){
        if(st.has(s[r])) cnt ++ ;
        //同样是精髓,满足>=k的边界，也就是有边界一直加，到了该滑动的时候， 
        //做了一个has判断，has的时候都会加l，移动左边界，但是不一定减
        //如果之前的左边界是的话，我们减一个，因为这个是的滑过去了
        if(r>=k && st.has(s[l++])) cnt -- ;
        //存储的是最大满足
        res = Math.max(res,cnt);
        //如果正好，相当于最大值了，返回
        if(res == k) return res;
    }
    return res;
}
let result =  maxVowels("abcilidef",3);
console.log("result",result);
