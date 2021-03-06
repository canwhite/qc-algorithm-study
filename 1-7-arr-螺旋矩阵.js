/*
题目-------------------------------------------------
给定一个正整数n,生成一个包含1~n^2所有元素,且元素按顺时针
顺序螺旋排列的正方形矩阵
示例：
输入：3
输出：[ [ 1, 2, 3 ], [ 8, 9, 4 ], [ 7, 6, 5 ] ]


思路-------------------------------------------------
大家还记得我们在数组中遇到的，每次遇到二分法，都是一看就会，一写就废中讲解二分法，
提到要写正确的二分法一定要坚持循环不变原则
-----所谓循环不变原则:------
就是每次循环都要把原来的数组拷贝一份，然后把拷贝的数组放到原来的数组中，
-------------------------------------------------------------------------------------
-----这里的解释是:----------
边界清晰不变，在循环中加入条件，然后人为的让条件为真，达到“不变”的目的

模拟顺时针画矩阵的过程:

填充上行从左到右
填充右列从上到下
填充下行从右到左
填充左列从下到上
由外向内一圈一圈这么画下去。


可以发现这里的边界条件非常多，在一个循环中，
如此多的边界条件，如果不按照固定规则来遍历，
那就是一进循环深似海，从此offer是路人。

这里一圈下来，我们要画每四条边，这四条边怎么画，
每画一条边都要坚持一致的左闭右开，或者左开又闭的原则，
这样这一圈才能按照统一的规则画下来。


这里每一种颜色，代表一条边，我们遍历的长度，
可以看出每一个拐角处的处理规则，拐角处让给新的一条边来继续画。
这也是坚持了每条边左闭右开的原则。

一些同学做这道题目之所以一直写不好，代码越写越乱。

就是因为在画每一条边的时候，一会左开又闭，一会左闭右闭，一会又来左闭右开，岂能不乱。

*/


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