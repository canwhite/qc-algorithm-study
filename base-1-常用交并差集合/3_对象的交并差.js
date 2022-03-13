let obj1={
    a:'asd',
    b:'aassd',
    c:'assdfd',
    d:'asfdgd'
    
}
let obj2={
    a:'asd',
    c:'assdfd',
    e:'abc'
}

//交集
function inter(obj1,obj2){
    let intersections = {};
    Object.keys(obj2).map(function(key){
        //key包含且值相等,返回合并的键值对
        if(Object.keys(obj1).includes(key) &&  (obj2[key] == obj1[key])) return Object.assign(intersections,{[key]:obj2[key]})
    })
    return intersections;
}
let intersections = inter(obj1,obj2);
console.log("intersections",intersections);

//并集
let andset = Object.assign(obj1,obj2);
console.log("andsign",andset);

//差集,可以理解为从并集中去掉交集
function diff(andset,intersections){
    let difference = {};
    let andkeys = Object.keys(andset);
    let interkeys = Object.keys(intersections);
    let dkeys = andkeys.filter((item)=>!interkeys.includes(item));
    dkeys.map(key=>Object.assign(difference,{[key]:andset[key]}))
    return difference;
}
console.log("difference",diff(andset,intersections))

