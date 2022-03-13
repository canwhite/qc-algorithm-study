/*----------------------------------------
广度优先搜索
广度优先搜索会优先从离起点近的节点开始搜索

如果从一棵树的角度来看的话，是先宽再高
主要是用到了栈
----------------------------------------*/

let breadth = (node)=>{
    let nodes = [];
    let stack = [];
    if(node){
        stack.push(node);
        //如果stack里边有值
        while(stack.length){

            //从一行里边一个个拿出来children进行下一行
            let item = stack.shift();
            nodes.push(item);
            //拿到children，横向的往栈里边加
            let children = item.children || [];

            //然后再横向添加一行
            for(let i = 0; i<children.length;i++){
                stack.push(children[i]);
            }
        }
    }
    return nodes;
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
let result =  breadth(obj);
console.log("==result==",result);