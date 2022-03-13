//对象数组的交并差
let a = [ 
    {id: "1", fpcNameCode: "34"},
    {id: "2", fpcNameCode: "33"},
    {id: "3", fpcNameCode: "35"},
    {id: "4", fpcNameCode: "36"}
];
let b = [ 
    {id: "1", fpcNameCode: "34"},
    {id: "2", fpcNameCode: "33"}
];
//因为includes主要是针对原始值比对，所以我们把各自的ids抽出来
let a_ids = a.map(item=>item.id)
let b_ids = b.map(item=>item.id);


//交集
let intersections = a.filter(item=>b_ids.includes(item.id));
console.log("intersections",intersections);

//并集
let andset = a.concat(b.filter((item)=>!a_ids.includes(item.id)))
console.log("--andset--",andset);

//差集
let difference = a.concat(b).filter((item) => !a_ids.includes(item.id) || !b_ids.includes(item.id));
console.log("--difference--",difference);
