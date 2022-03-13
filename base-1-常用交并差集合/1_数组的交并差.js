let a = [1,2,3];
let b = [3,4,5,6];

//交集
let intersections = a.filter((item)=>b.includes(item));
console.log("intersections",intersections);
//并集
let andset = a.concat(b.filter((item)=>!a.includes(item)));
console.log("andset",andset);
//差集
let difference = a.concat(b).filter((item)=> !a.includes(item) || !b.includes(item));
console.log("difference",difference);