/**
 * ftb tools main js
 * @author: hellovigoss@gmail.com
 * @lol~
 */
var global = require("./global.js");
var properties = require('./properties.js');
var analyzer = require('./analyzer.js');
var dir = require("./dir.js");
var template = require("./template.js");


//参数获取
var arguments = process.argv.splice(2);
if(arguments.length < 1){
    console.log('Usage: node ftb.js path[  config_file_path]');
}


//读取系统全局配置文件
var globalConfig = (function(argFilePath){
    if((typeof argFilePath) == "undefined"){
        argFilePath = "./config.properties";
    }
    return properties.parseproperties(argFilePath, "UTF-8");
})(arguments[1]);

global.init(globalConfig);

//进行文件分析获取ftb定义方法
var funcArr = (function(dirPath){

    //遍历文件
    var fileList = (function(){
        var tmpList = [];
        dir.walk(dirPath, tmpList);
        return tmpList;
    })();

    //清空输出文件内容
    template.flush();
    
    //分析ftb元素
    var tmpList = [];
    fileList.forEach(function(filePath){
        analyzer.analysis(filePath, tmpList);
    });
    
    return tmpList;
})(arguments[0]);
