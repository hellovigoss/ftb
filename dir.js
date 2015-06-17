/**
 * ftb tools js for walk dir
 * @author: hellovigoss@gmail.com
 * @since: 2015-06-05
 * @lol~
 */
var fs = require('fs');
var path = require('path');

exports.walk = function(path, fileList){
    var dirList = fs.readdirSync(path);

    dirList.forEach(function(item){
        if(fs.statSync(path + '/' + item).isFile()){
            fileList.push(path + '/' + item);
        }
    });

    dirList.forEach(function(item){
        if(fs.statSync(path + '/' + item).isDirectory()){
            exports.walk(path + '/' + item, fileList);
        }
    });
}

exports.rmdir = function(dir){
    var exec = require('child_process').exec;
    exec('rm -rf '+dir, function(err){
        return;
    });
}

exports.mkdir = function(dir){
    var exec = require('child_process').execSync;
    exec('mkdir -p '+dir);
}
