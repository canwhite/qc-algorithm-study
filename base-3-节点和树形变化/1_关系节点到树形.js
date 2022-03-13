//主要是有一个parentId维系关系
let arr =[
    {id:2,name:'部门B',parentId:0},
    {id:3,name:'部门C',parentId:1},
    {id:1,name:'部门A',parentId:2},
    {id:4,name:'部门D',parentId:1},
    {id:5,name:'部门E',parentId:2},
    {id:6,name:'部门F',parentId:3},
    {id:7,name:'部门G',parentId:2},
    {id:8,name:'部门H',parentId:4}
];

function arrToTree(list,parentId){
    //传进来数组的len
    let len = list.length;
    //在循环中找到所有匹配该父id的节点，放入children
    function loop(parentId){
        let res = [];
        for(let i =0;i< len;i++){
            let item = list[i];
            if(item.parentId == parentId){
                //往深了挖了
                item.children  = loop(item.id);
                res.push(item);
            }
        }
        //res是最终往children上挂的res
        return res;
    }   
    return loop(parentId);
}

let result = arrToTree(arr,0);
console.log("--result--",result);
//dfs将树形结构再展开
/* let depth1 = (node,nodeList = [])=>{
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

let arr1 = depth1(result[0]);
console.log(arr1); */