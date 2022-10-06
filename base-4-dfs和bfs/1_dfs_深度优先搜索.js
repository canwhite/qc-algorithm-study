/*
深度优先搜索----------

通过递归实现深度优先搜索
深度优先查询的特点是沿着一条路径不断往下，直到不能再继续为止，
然后再折返，开始搜索下一条候补路径

深度优先搜索传入node和维系一个最终的数组
然后根据需要递归的标识符，不断往下

实际上如果从一个树的角度来看的话，是先高再宽


*/


//递归的方式：
//确认参数，确认单次逻辑，确定返回值
//类似于将将树形结构转化为打平的节点，
let depth1 = (node,nodeList = [])=>{
    //node不能为null
    if(node != null){
        //添加节点的操作
        nodeList.push(node);
        let children = node.children ||[];
        //for循环时横向，depth1是纵向
        for(let i = 0;i<children.length;i++){
            //将子节点的和当前的nodeList传进去
            depth1(children[i],nodeList);
        }
    }
    return nodeList;
}

//对obj的处理
let obj = { 
    value:0,
    children: [
        { 
            value: 1, 
            children: [
                { 
                    value: 2, 
                    children: [{ 
                        value: 3 
                    }] 
                }
            ] 
        }, 
        { 
            value: 4 
        }, 
        { 
            value: 5, 
            children: [{ 
                value: 7, 
                children: [{ 
                    value: 8 
                }] 
            }] 
        }, 
        { 
            value: 6 
        }
    ] 
}

let arr = depth1(obj);
console.log("-----",arr);

//在理解完回溯之后，我们再来思考之前对dfs的理解，好像就有问题了
//我只是遍历得到一个数组，而没有去实现搜索的目的，这样并不是dfs
//现在在这里在写一个版本
/**关于回溯和dfs的区别，有两种说法
 * (1)回溯是一种方法论，而dfs更多的是一种实现
 * (2)回溯 = dfs + 剪枝
 *  对于我个人来说，我更倾向于第一种说法
 * 回溯更多的是为了拿到全集和子集，而dfs是为了找到某个值，
 * dfs是回溯的一种特例，这是我的理解
 * 
 * 以下是我重看回溯之后拿出来的dfs
*/
const dfs = function(start,target){
    console.log("Visiting Node" +start.value);
    //达成结果之后的返回
    if(start.value == target){
        console.log("Found ")
        //dfs的实现
        return start;
    }
    //遍历children直到拿到结果
    //注意有的node可能没有这个children
    for(var i = 0; i < start?.children?.length; i++){
        var result = dfs(start.children[i],target);
        //如果递归没有return，一直都是上边步骤
        //拿到结果之后我们再做一层返回就可以了
        if(result !== null){
            return result;
        }
    }
    //最后是一种没查到的情况
    return null;
}


//调用一下看下效果
const result =  dfs(obj,8);
console.log("--result--",result);
//这样就有点类似于深度优先查询的样子了




