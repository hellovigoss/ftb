/**
 * ftb tools js for analysis code
 * @author: hellovigoss@gmail.com
 * @since: 2015-06-05
 * @lol~
 */
var fs = require('fs');

exports.analysis = function(filePath, funcArr){
    var data = fs.readFileSync(filePath, "utf-8");

    //find ftb
    var funcRegex = /\/\/\@ftb *(.*?)\W*?(\/[\W\w]*?\/)?\W*?function *(\w*?)\(.*\)/g;
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
        var argRegex = /\@params?\W*(\w*).*ftb/g;
        var argMatch = '', funcArgv = [];
        while(argMatch = argRegex.exec(funcMatch[2])){
            funcArgv.push(argMatch[1]);
        }
        funcArr.push({
            name: funcName,
            args: funcArgv
        });
    }
}
