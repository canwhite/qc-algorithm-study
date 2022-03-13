
function arrToTree(list,condition){
    const newArr = [];
    condition = JSON.parse(JSON.stringify(condition));
    let order = condition.shift();//从顶部取出一个，ps，unshift是往顶部添加，key值
    let holdArr = [];
    const deep = condition.length;//遍历深度

    //对现有list进行遍历，单次循环的逻辑
    if(deep > 0){
      list.forEach((item, index) => {
        const holdIndex = holdArr.indexOf(item[order]);
        if (holdIndex > -1) {
          newArr[holdIndex]["children"].push(item);
          newArr[holdIndex]["label"] = item[order];
        } else {
          holdArr.push(item[order]);
          newArr.push({
            label: item[order],
            children: new Array(item),
          });
        }
      });
    }

    //对下一级进行遍历
    newArr.forEach((item, index) => {
      if (item.children.length > 0 && deep) {
        //给children赋值 递归
        item.children = arrToTree(item.children, condition);
      }
    });
    return newArr;
}


let list = [
    {
    "yxName": "软件工程系",
    "receive": 1,
    "stuId": 5955,
    "xqName": "河南艺术职业学院",
    "bjName": "网络营销2班",
    "forward": 0,
    "school_number": "202103040506",
    "zyName": "软件工程",
    "njName": "2021",
    "stuName": "张昊的",
    "replenish": 1
    },
    {
    "yxName": "软件工程系",
    "receive": 0,
    "stuId": 1,
    "xqName": null,
    "bjName": "大数据2班",
    "forward": 0,
    "school_number": "202103112411",
    "zyName": "软件工程",
    "njName": "2021",
    "stuName": "测试学生",
    "replenish": 0
    },
    {
    "yxName": "软件工程系",
    "receive": 0,
    "stuId": 2,
    "xqName": null,
    "bjName": "大数据2班",
    "forward": 0,
    "school_number": "202103112412",
    "zyName": "软件工程",
    "njName": "2021",
    "stuName": "张三",
    "replenish": 0
    },

    {
    "yxName": "工程系",
    "receive": 0,
    "stuId": 5983,
    "xqName": "河南艺术职业学院",
    "bjName": "软件开发1班",
    "forward": 0,
    "school_number": "",
    "zyName": "移动应用",
    "njName": "2021",
    "stuName": "孙对策",
    "replenish": 0
    },
  ];
  //一个现实的例子，这里加一个脏数据处理
  list.map(item=>{
    item.xqName =  item.xqName == null ? "其它" : item.xqName;
    return item;
  })
  
  const winCondition = ["xqName", "yxName", "zyName","bjName","xxx"];//规则
  let treeData = arrToTree(list,winCondition);  
  console.log("treeData",JSON.stringify(treeData));

