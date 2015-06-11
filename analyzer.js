/**
 * ftb tools js for analysis code
 * @author: hellovigoss@gmail.com
 * @since: 2015-06-05
 * @lol~
 */
var fs = require('fs');
var global = require("./global.js");

exports.analysis = function(filePath, funcArr){
    var config = global.get();
    var data = fs.readFileSync(filePath, "utf-8");
    //limit the shuffix of searching file
    if(typeof config.shuffix != "undefined"){
        var fileSplitArr = filePath.split(".");
        if(fileSplitArr[fileSplitArr.length - 1] != config.shuffix){
            return;
        }
    }    

    //find ftb
    var funcRegex = new RegExp(config.sectionReg, "gi");
    var funcMatch;

    //find function name and args
    while(funcMatch =  funcRegex.exec(data)){
        var funcName;
        if(funcMatch[1] != ''){
            funcName = funcMatch[1];
        }
        else{
            funcName = funcMatch[3];
        }

        //arguments
        var argRegex = new RegExp(config.paramsReg, "gi");
        var argMatch = '', funcArgv = [];
        while(argMatch = argRegex.exec(funcMatch[2])){
            funcArgv.push(argMatch[1]);
        }

        //options

        var optRegex = [];
        var optMatch = '', funcOpt = {}, optPair = [];
        [
            config.typeReg,
            config.cacheReg,
            config.dataTypeReg,
            config.asyncReg
                ].forEach(function(reg){
                    if(typeof reg != "undefined"){
                        optRegex.push(new RegExp(reg));
                    }
            });

        optRegex.forEach(function(reg){
            optMatch = reg.exec(funcMatch[2]);
            if(optMatch != null){
                optPair.push(optMatch[1] + ":\"" + optMatch[2] + "\"");
            }
        });
        funcOpt = new Function("return ({" + optPair.join(',') + "})")();

        funcArr.push({
            name: funcName,
            args: funcArgv,
            options: funcOpt
        });
    }
}
