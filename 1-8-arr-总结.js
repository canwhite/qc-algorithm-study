/*
理论基础：------------------------------------------
数组在内存中的存储方式：
数组是存放在连续内存空间上的相同类型数据的集合。
数组可以方便的通过下标索引的方式获取到下标下对应的数据。

需要注意两点：
1.数组下标都是从0开始的
2.数组内存空间的地址是连续的

正是因为数组在内存空间的地址是连续的，所以我们在删除或者增添元素的时候，
就难免要移动其他元素的地址
例如删除下标为3的元素，就需要对下标为3的元素后边的所有元素做移动操作

数组的元素是不能删的，只能覆盖

那么二维数组是连续的空间吗？
所以二维数组在内存中不是3*4的连续地址空间，
而是三条连续的空间组合在一起，每条四个


学习思路---------------------------------------------------------
学习的目的是为了解决问题，所以我们要知道某种工具解决的是什么问题？
并且解决的过程中有哪些固定模式
知道了这些特征，在见到题目，看到特征的时候，
我们就能把答案默写下来了

下边问题类型总结

1.快慢指针 - 数组内容删除
2.左右指针 - 正负两端排序
3.定宽滑动窗口 - 一定范围的最多
4.非定宽滑动窗口 - 非一定范围最少但是满足条件-这就需要右边没走一位，左边循环变化缩小了
5.二分法 -分类问题，关于循环不变原则的边界



数组的经典题目：-------------------------------------------------

1.双指针之快慢指针----------------------------------------------------

快慢指针法的意义在于，慢指针指向值，快指针完成操作变化
通过一个快指针和一个慢指针在一个for循环下完成两个for循环的工作



示例 1: 给定 nums = [3,2,2,3], 移除val = 3, 
函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。 
你不需要考虑数组中超出新长度后面的元素。

removeElement = (nums,val)=>{
    let slowIndex = 0;
    for(let fastIndex = 0; fastIndex<nums.length ; fastIndex ++){
        //快指针没有发现目标值，慢指针是加的；并且是赋值的
        //但是如果快指针发现了目标值，慢指针就会停下，并且不赋值，
        //最后返回的是慢指针的index；
        if(val != nums[fastIndex]){
            //如果slowIndex就会停一下,出现了快慢异位，完成交换工作
            nums[slowIndex ++] = nums[fastIndex];
        }
    }
    return slowIndex;
}




2.双指针之左右指针-------------------------------------------------------------

这种解决平方问题是很合适的，
因为这种需要从两边往中间夹，两边的大，中间的小
左右指针和快慢指针一样，都可以使用一个for循环
一个i在前，一个j在尾，然后只要满足i <= j,就可以持续变化
将左右指针的移动在逻辑块儿中进行

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

//PS1:1-2总结 -----------------------------------------------------------------
1和2也有很多相似点，这里放在一起论述
---
它们都是把两次循环放在一个循环中去解决问题

1 - 快慢指针 - 慢指针外置，循环的是快指针，
    快指针没有发现要删除的目标，慢指针在逻辑块中是和快指针同步加的，并且赋值，
    一旦发现要删除的目标，快慢异位，慢指针停，不赋值，这样要删除的内容就被忽略过去了

2 - 左右指针 - i,j分别是数组的左右两端，满足i<=j的时候循环
    然后通过左右比对，重置数组，并且各自++



3.双指针之固定间距指针---------------------------------------------------------

相当于定宽滑动窗口
对一个字符串，在给定范围的长度里，最多有几个元音字符

Input: s = "abciiidef", k = 3
Output: 3
Explanation: The substring "iii" contains 3 vowel letters.


const maxVowels = (s,k)=>{
    const st = new Set(["a","e","i","o","u"]) ;
    let res = 0;
    let l = 0;//初始化左侧
    let cnt = 0;
    
    //直接for循环的是右侧，左边界的变化在逻辑块中
    //关键点在于满足某种情况的时候，l++，也就是左边界移动，计数变化

    for(let r = 0; r< s.length; r++ ){
        if(st.has(s[r])) cnt ++ ;
        //同样是精髓,满足>=k的边界，也就是有边界一直加，到了该滑动的时候， 
        //做了一个has判断，has的时候都会加l，移动左边界，但是不一定减
        //如果之前的左边界是的话，我们减一个，因为这个滑过去了，不在窗口里了
        if(r>=k && st.has(s[l++])) cnt -- ;
        //存储的是最大满足
        res = Math.max(res,cnt);
        //如果正好，相当于最大值了，返回
        if(res == k) return res;
    }
    return res;
}



4.滑动窗口---------------------------------------------------------------------
有某个判断标准，满足的时候记录并滑动
这和上边的固定间距指针又有区别，是动态的间距
相当于非定宽滑动窗口

let minSubArrayLength = (s,nums)=>{
    let result = Infinity;
    let sum = 0;//滑动窗口数值之和
    let l = 0;//左侧
    let cnt = 0;//滑动窗口的长度


    //直接for循环的是右侧，左边界的变化在逻辑块中
    //关键点在于满足某种情况的时候，l++，也就是左边界移动，计数变化
    for(let r=0;r<nums.length;r++){
        //r是正常走的
        sum += nums[r];

        //只有sum >=s满足，我们就可以一直让l去滑动，但是r是暂时固定的
        //直到不满足这个条件
        while(sum >=s){
            //取子序列的长度
            cnt = r-l+1;
            //我们取得是最小连续数组
            result = Math.min(cnt,result);
            //精髓就在于此处，先将当前的i值减去，缩小窗口的大小，然后再++，变换起点位置

            sum -= nums[l++];
        }
    }
    //如果result没有被赋值，就返回0，说明没有符合条件的子序列
    return result == Infinity ? 0 :result;
}


//PS2： 3-4总结-----------------------------------------------------------------
3-4很接近，这里简单做一个总结
---
3.定宽滑动窗口 - 右边每变化一个，左边也要变化一次，但是变化不一定计数，
    所以就将左侧的变化放在条件里，而不是逻辑块儿里
4.非定宽滑动窗口 - 非一定范围最少但是满足条件-这就需要右边没走一位，左边循环变化缩小了




5.二分法---------------------------------------------------------

在这道题目中我们讲到了循环不变量原则，只有在循环中坚持对区间的定义，才能清楚的把握循环中的各种细节。

二分法是算法面试中的常考题，建议通过这道题目，锻炼自己手撕二分的能力。

示例，在一个数组中查找出target
let search = function(nums,target){
    let l= 0,r = nums.length;//因为右边是开的，所以不用减1，最后一位也不参与计算
    //区间左闭右开[)
    while(l < r){
        //取中间
        let mid = (l+r) >>1;
        //如果中间正好是则返回中间
        if(nums[mid] === target) return mid;
        let isRight = nums[mid] < target;//这里判断是否满足在右边
        l = isRight ? mid+1 :l;//因为mid判断过了，且左边是实的
        r = isRight ? r:mid;//mid相当于那个开，因为循环是<,是虚的，所以不参与判断
    }
    return -1;
}
let result =  search(nums,target);
console.log("result",result);




6.模拟行为---------------------------------------------------------------------

这个不算什么算法，算是对循环不变原则的进一步拓展
这里我们考察的是螺旋矩阵


let generateMatrix = function(n) {

    //先定义数据结构
    const res = Array.from({length:n}).map(()=>Array.from({length:n}));

    //定义每循环一个圈的起始位置
    let startx = 0,starty = 0;

    //每个圈循环几次，例如n为奇数3，那么loop=1只是循环一圈，矩阵中间的值需要单独处理
    let loop = parseInt(n/2);

    //矩阵中间的位置，例如：n为3，中间的位置是(1,1), n为5，中间的位置是(2,2)
    let mid = parseInt(n/2);

    //用来给矩阵中每一个空格赋值，初始值是1，依次递增
    let count = 1;
    
    //每一圈循环，需要控制每一条边遍历的长度，offset是弹性边框，是需要除去的那一个
    //我们可以用实例归纳思考，
    //如果是第一圈我们去掉边界，就是减去1
    //到了第二圈，除了两边已经用到的，我们还要预留一个位置作为开，所以是在最开始1的基础上加2
    //这个画一个4*4就明白了
    
    let offset = 1;
    var i,j;
    while(loop--){
        i = startx;
        j = starty;
        //下面开始画每一条边，四个循环就是模拟转了一圈
        //模拟填充上行从左到右(左闭右开)
        //填充行的时候为啥看j?
        //第一行，行不变，列在变
        for(j = starty;j< starty + n - offset;j++){
            res[i][j] = count++;
        }
        //模拟填充右列从上到下(左闭右开)
        for(i = startx; i< startx + n -offset;i++){
            res[i][j] = count++;
        }
        //模拟填充下行从右到左(左闭右开)
        for(;j>starty;j--){
            res[i][j] = count ++ ;
        }
        //模拟填充左列从下到上(左闭右开)
        for(;i>startx;i--){
            res[i][j] = count++;
        }
        
        //从第二圈开始的时候，起始位置各自加1，
        //例如，第一圈起始位置是(0,0),第二圈起始位置是（1，1）
        startx ++ ;
        starty ++ ;


        //offset控制每一圈里边每一条边遍历的长度
        offset += 2;

        //如果n为奇数的话，需要单独给矩阵最中间的位置赋值
        if(n % 2){
            res[mid][mid] = count;
        }
        return res;
    }
}
let result =  generateMatrix(3);
console.log(result);




//PS3: 5-6总结
实际上这部分是对循环不变原则的总结，开闭到底如何定性
---
以二分法为例

其实主要是对边界的判断，
左边是要闭的，所以判断完mid之后，
左边界需要+1，需要是未必判断过的确切值
关键在于右边界的不同：

1.如果左闭右闭------
那么取右边界的时候需要有实际值，
也就是length -1，且r在循环的时候能取到即l<=r
判断mid的时候，如果判定在左边，确定右边界的时候应该是mid-1

2.如果是左闭右开------
那么右边界就不需要实际值了，
所以右边界不用取到，r==arr.length 和l<r
判断mid的时候，如果判断在左边，确定有边界的时候可以直接用mid，
因为循环又不用循环到



*/