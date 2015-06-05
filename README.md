# ftb
全称 frontend to backend，是一款用来贯穿前端与后端的项目。

###项目背景
随着web开发的多元性，最基本的特征就是面向用户的前端开发与面向业务逻辑的后端开发职责分离、各司其职。  
但终究还是在同一个项目中进行数据交互。前后端交互的两种方案是：采取模板引擎同步渲染；类似富客户端前后端分离，采取ajax、websocket等方案与后端进行数据交互。  
第二种方案还是不免使得前端开发人员与后端开发人员商量接口，约束调用url、变量等信息。  
ftb即为了打通前后端所做的努力。

###使用方法
* git clone 
* 安装运行时环境node
* 编写全局配置

```shell
baseurl=http://myftb.com/
dataType=json
type=POST
output=output.js
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

* 前端引入使用

###todo
* ~~引入全局配置~~ done
* 使用输出模板
* 优化代码组织结构

###联系
hellovigoss@gmail.com
