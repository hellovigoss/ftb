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
    var ajaxJS = "";
    funcArr.forEach(function(func){
        var ajaxArgs = [];
        func.args.forEach(function(arg){
            ajaxArgs.push("\""+arg+"\":"+arg);
        });
        ajaxJS += "function "+func.name+"(";
        func.args.push("cb");
        ajaxJS += (func.args).join(", ");
        ajaxJS += "){\n$.ajax({\n\turl:'"+(global.get()).baseurl+func.name;
        ajaxJS += "',\n\ttype:'"+(global.get()).type;
        ajaxJS += "',\n\tdataType:'"+(global.get()).dataType;
        ajaxJS += "',\n\tdata:{"+ajaxArgs.join(",")+"},\n\t";
        ajaxJS += "success:function(response){\n\t\tcb(response);\n\t\t}\n\t});\n}\n";
    });
    exports.output(ajaxJS, outputDir);

}

exports.compress = function(funcArr, outputDir){
    var ajaxJS = ";";
    funcArr.forEach(function(func){
        var ajaxArgs = [];
        func.args.forEach(function(arg){
            ajaxArgs.push("\""+arg+"\":"+arg);
        });
        ajaxJS += "function "+func.name+"(";
        func.args.push("cb");
        ajaxJS += (func.args).join(",");
        ajaxJS += "){$.ajax({url:'"+(global.get()).baseurl+func.name;
        ajaxJS += "',type:'"+(global.get()).type;
        ajaxJS += "',dataType:'"+(global.get()).dataType;
        ajaxJS += "',data:{"+ajaxArgs.join(",")+"},";
        ajaxJS += "success:function(response){cb(response);}});}";
    });
    exports.output(ajaxJS, outputDir);
}

exports.output = function(jscode, outputDir){
    //写入文件
    fs.writeFile(path.join(__dirname, (global.get()).output), jscode, function (err) {
        if (err) throw err;
    });
}
