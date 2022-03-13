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
    index:0,
    children: [
        { 
            index: 1, 
            children: [
                { 
                    index: 2, 
                    children: [{ 
                        index: 3 
                    }] 
                }
            ] 
        }, 
        { 
            index: 4 
        }, 
        { 
            index: 5, 
            children: [{ 
                index: 7, 
                children: [{ 
                    index: 8 
                }] 
            }] 
        }, 
        { 
            index: 6 
        }
    ] 
}

let arr = depth1(obj);
console.log("-----",arr);



