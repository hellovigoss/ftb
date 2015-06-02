var fs = require('fs');
var path = require('path');

//系统全局变量
var global = (function(){
    return {
        "baseurl": "http://myftb.com/",
        "dataType": "json",
        "type": "POST",
        "output": "output.js"
    };
})();

//参数获取
var arguments = process.argv.splice(2);
if(arguments.length < 1){
	console.log('Usage: node ftb.js path');
}
//转换目录
var dirPath = arguments[0];
//系统所有转换结果
var funcArr = [];

//遍历文件
fileList = [];
function walk(path){
	var dirList = fs.readdirSync(path);

	dirList.forEach(function(item){
		if(fs.statSync(path + '/' + item).isFile()){
			fileList.push(path + '/' + item);
		}
	});

	dirList.forEach(function(item){
		if(fs.statSync(path + '/' + item).isDirectory()){
			walk(path + '/' + item);
		}
	});
}

walk(dirPath);

//分析ftb元素
fileList.forEach(function(filePath){
	analysis(filePath);
});

//拼接js代码
var ajaxJS = ";";
funcArr.forEach(function(func){
	var ajaxArgs = [];
	func.args.forEach(function(arg){
		ajaxArgs.push("\""+arg+"\":"+arg);
	});
	ajaxJS += "function "+func.name+"(";
    func.args.push("cb");
	ajaxJS += (func.args).join(",");
	ajaxJS += "){$.ajax({url:'"+global.baseurl+func.name;
    ajaxJS += "',type:'"+global.type;
    ajaxJS += "',dataType:'"+global.dataType;
    ajaxJS += "',data:{"+ajaxArgs.join(",")+"},";
    ajaxJS += "success:function(response){cb(response);}});}";
});

//写入文件
fs.writeFile(path.join(__dirname, global.output), ajaxJS, function (err) {
    if (err) throw err;
});

function analysis(filePath){
	var data = fs.readFileSync(filePath, "utf-8");

	//php解析开始
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
