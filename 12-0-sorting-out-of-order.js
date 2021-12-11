/*------------------------------------------------------------------------------------------------------
以下方法的根源，是因为random函数的随机范围是[0,1)，左闭右开

1.生成[0,10]的随机整数，Math.round(Math.random() * 10) ，通过四舍五入可以将大于9.5的数值转换为10；
    直接乘上要生成的最大数字就可以了，还有一种是random()*9+1,也可以实现左右闭合，但是还是通过Math函数解决吧
2.生成[0,10)的随机整数，Math.floor(Math.random() * 10 )；
3.生成(0,10]的随机整数，Math.ceil(Math.random() * 10 )；

-------
array.sort(compareFunction)
a-b是升序，b-a是降序


--------------------------------------------------------------------------------------------------------*/
function outOfOrder(arr){
    arr.sort(()=>{
        //左闭右开，就是从-1，到1，左闭右开
        //然后就可以升序降序自由排列了
        return Math.random()*2-1
    });
    return arr;
}

let arr = [5,2,3,5];
let result  = outOfOrder(arr);
console.log("----",result);








