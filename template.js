/**
 * ftb tools js for javascript code template engine
 * @author: hellovigoss@gmail.com
 * @since: 2015-06-05
 * @lol~
 */
var fs = require('fs');
var path = require('path');
var global = require("./global.js");

exports.normal = function(funcArr, outputDir){
    exports.output(getAjaxStr(funcArr, false), outputDir);

}

exports.compress = function(funcArr, outputDir){
    exports.output(getAjaxStr(funcArr, true), outputDir);
}

exports.flush = function(){
    fs.writeFileSync(path.join(__dirname, (global.get()).output), "", {encoding: (global.get()).encoding, flag: "w"});

}

exports.output = function(jscode, outputDir){
    fs.writeFile(path.join(__dirname, (global.get()).output), jscode, {encoding: (global.get()).encoding, flag: "a"}, function (err) {
        if (err) throw err;
    });
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
