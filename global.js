/**
 * ftb tools js for store global variables
 * @author: hellovigoss@gmail.com
 * @since: 2015-06-05
 * @lol~
 */
var global = {};
exports.init = function(globalVar){
    global = globalVar;
}

exports.get = function(){
    return global;
}
