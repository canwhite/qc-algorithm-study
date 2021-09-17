/*=====================
完成算法题个数计数
======================*/
const glob = require("glob");
const path = require('path');
const fs = require('fs');
const parser = require("@babel/parser");
//PS:transformFromAstAsync
const { transformFromAstSync } = require('@babel/core');
//glob，根据正则匹配，读出文件名，然后生成文件名数组
const files = glob.sync("./*.js");
console.log("-----",files.length,"-----");

//遍历files，item就是单个文件名
files.forEach((item,index)=>{
    //通过node的fs模块，读取文件内代码
    const sourceCode = fs.readFileSync(
        item, {
        encoding: 'utf-8'
    });
    /* console.log(sourceCode); */
    //通过babel将代码转化为ast
    const ast = parser.parse(sourceCode,{
        sourceType:"unambiguous",
    })

    //然后将ast转化为你想要的目标代码
    //这个过程叫做转译

    //最后生成目标代码
    // fs.writeFileSync



});