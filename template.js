/**
 * ftb tools js for javascript code template engine
 * @author: hellovigoss@gmail.com
 * @since: 2015-06-05
 * @lol~
 */
var fs = require('fs');
var path = require('path');
var global = require("./global.js");
var dir = require("./dir.js");

exports.normal = function(funcArr, output){
    exports.output(getAjaxStr(funcArr, false), getFileName(funcArr.options.ns));
}

exports.compress = function(funcArr, output){
    exports.output(getAjaxStr(funcArr, true), getFileName(funcArr.options.ns));
}

exports.flush = function(){
    dir.rmdir(path.join(__dirname, (global.get()).output));
}

exports.output = function(jscode, outputFile){
    var filePath = outputFile.split(".");
    filePath.unshift((global.get()).output);
    filePath.unshift(__dirname);
    var fileName = filePath.pop();
    fileName = filePath.pop() + "." +fileName;
    dir.mkdir(filePath.join("/"));
    filePath.push(fileName);
    fs.open(filePath.join("/"), "a", function(err, fd){
        if(err) throw err;
        fs.writeSync(fd, jscode, 0, (global.get()).encoding);
        fs.close(fd);
    });
}

function getFileName(namespace){
    var outputFile = (global.get()).outputFile;
    if(typeof namespace != "undefined"){
        outputFile = namespace + ".js";
    }
    return outputFile;
}

function getAjaxStr(func, compress){
    var ajaxJS = [];
        var ajaxArgs = [];
        func.args.forEach(function(arg){
            ajaxArgs.push("\""+arg+"\":"+arg);
        });
        func.args.push("cb");
        ajaxJS.push("function "+func.name+"(" + (func.args).join(",") + "){");
        ajaxJS.push("\t$.ajax({")
        ajaxJS.push("\t\turl:'"+(global.get()).baseurl+func.name + "',");
        ajaxJS.push("\t\ttype:'"+getVal(func.options, "type") + "',");
        ajaxJS.push("\t\tdataType:'"+getVal(func.options, "dataType") + "',");
        ajaxJS.push("\t\tcache:'"+getVal(func.options, "cache") + "',");
        ajaxJS.push("\t\tasync:'"+getVal(func.options, "async") + "',");
        ajaxJS.push("\t\tdata:{"+ajaxArgs.join(",")+"}" + ",");
        ajaxJS.push("\t\tsuccess:function(response){");
        ajaxJS.push("\t\t\tcb(response);");
        ajaxJS.push("\t\t\t}");
        ajaxJS.push("\t\t});");
        ajaxJS.push("}");
    if(compress){
        return ";" + (ajaxJS.join("")).replace(/\t/g, "");
    }
    else{
        return ajaxJS.join("\r\n") + "\r\n";
    }
}

function getVal(obj, key){
    var val = eval("obj." + key);
    if(typeof val == "undefined"){
        return eval("(global.get())." + key);
    }
    else{
        return val;
    }
}
