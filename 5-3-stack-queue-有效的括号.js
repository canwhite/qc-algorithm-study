/* 
给定一个只包括 
'('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：
左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
注意空字符串可被认为是有效字符串。
示例 2:
输入: "()[]{}"
输出: true
示例 3:
输入: "(]"
输出: false 
*/
//版本一比较好理解
var isValid1 = function (s) {
    const stack = [];
    for (let i = 0; i < s.length; i++) {
        let c = s[i];
        switch (c) {
        case '(':
            stack.push(')');
            break;
        case '[':
            stack.push(']');
            break;
        case '{':
            stack.push('}');
            break;
        default:
            if (c !== stack.pop()) {
            return false;
            }
        }
    }
    return stack.length === 0;
};


// 简化版本
var isValid2 = function(s) {
    const stack = [], 
        map = {
            "(":")",
            "{":"}",
            "[":"]"
        };
    for(const x of s) {
        //x是key,将key存入stack,跳出本次循环
        //eg：第一次push的是-(
        if(x in map) {
            stack.push(x);
            //前边的如果push上了就跳过本次循环
            continue;
        };

        //第二次进来-),我们通过第一次的key拿到)和x做对比
        if(map[stack.pop()] !== x) return false;
    }
    return !stack.length;
};

let s = "()[]{}";
isValid2(s);