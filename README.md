# ftb
全称 frontend to backend，是一款用来贯穿前端与后端的项目。

###项目背景
随着web开发的多元性，最基本的特征就是面向用户的前端开发与面向业务逻辑的后端开发职责分离、各司其职。  
但终究还是在同一个项目中进行数据交互。前后端交互的两种方案是：采取模板引擎同步渲染；类似富客户端前后端分离，采取ajax、websocket等方案与后端进行数据交互。  
第二种方案还是不免使得前端开发人员与后端开发人员商量接口，约束调用url、变量等信息。  
ftb即为了打通前后端所做的努力。

###使用方法
* git clone 

```shell
git clone https://github.com/hellovigoss/ftb.git
```

* 安装运行时环境node,https://nodejs.org/
* 编写全局配置

```shell
baseurl=http://myftb.com/ #项目根地址
dataType=json             #ajax数据交互类型
type=POST                 #ajax数据交互方式
output=output.js          #输出文件
compress=on|off           #是否开启输出压缩
```

* 后端直接进行业务开发
* 按ftb注释规范进行注释

```php
<?php
class Test extends Controller
{
	function __construct()
	{
		parent::__construct();

	}
	//@ftb asdf
	/**
	 * @params $a ftb
	 * @params b asdf asdf  ftb
	 */
	function action(){
	}
	//@ftb
	function anotherAction(){
	}
}
```

* 扫描系统生成javascript交互代码

```shell
node ftb.js .
```

```javascript
;function asdf(a,b,cb){$.ajax({url:'http://myftb.com/asdf',type:'POST',dataType:'json',data:{"a":a,"b":b},success:function(response){cb(response);}});}function anotherAction(cb){$.ajax({url:'http://myftb.com/anotherAction',type:'POST',dataType:'json',data:{},success:function(response){cb(response);}});}
```

* 前端引入使用

```html
<script src="./output.js"></script>
<script>
    var a, b;
    asdf(a, b, function(response){
            //do callback
            });
    anotherAction(function(response){
            //do callback
            });
</script>
```

###todo
* ~~引入全局配置~~ done
* ~~压缩模式/非压缩模式~~ done
* ~~使用输出模板~~ half done
* ~~优化代码组织结构~~ done
* 单个注释新增个性化配置项
* 输出多文件，支持名字空间

###联系
hellovigoss@gmail.com
