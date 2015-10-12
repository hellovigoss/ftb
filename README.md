# ftb
全称 frontend to backend，是一款用来贯穿前端与后端的项目。

###项目背景
随着web开发的多元性，最基本的特征就是面向用户的前端开发与面向业务逻辑的后端开发职责分离、各司其职。  
现有ajax方案还是不免使得前端开发人员与后端开发人员进行接口协商，约束调用url、变量等信息。  
ftb即为了打通前后端所做之努力。

###工具特点
* 非侵入式代码，注解模式提供生成标签，抛弃冗长的dsl编写
* 全局可配置默认ajax方案，独立配置各子调用项目
* 采用nodejs开发，高效的文件操作与代码生成
* 全量/压缩目的文件输出

###使用方法
* git clone 

```shell
git clone https://github.com/hellovigoss/ftb.git
```

* 安装运行时环境node,https://nodejs.org/
* 编写全局配置

```shell
#js缺省配置
baseurl=http://myftb.com/ #项目根地址
dataType=json             #ajax数据交互类型
type=POST                 #ajax数据交互方式
cache=false               #ajax缓存配置
async=true                #是否同步
#自定义相关正则匹配配置
sectionReg=\/\/\@ftb *(.*?)\W*?(\/[\W\w]*?\/)?\W*?function *(\w*?)\(.*\)    #获取ftb描述段的正则
paramsReg=\@params?\W*(\w*).*ftb    #获取参数的循环正则
typeReg=\@(type)\W*(\w*).*ftb    #ajax单独配置相关正则
cacheReg=\@(cache)\W*(\w*).*ftb
dataTypeReg=\@(dataType)\W*(\w*).*ftb
asyncReg=\@(async)\W*(\w*).*ftb
#系统配置
shuffix=php               #扫描制定后缀文件
output=output.js          #输出文件
compress=on|off           #是否开启输出压缩
encoding=utf-8            #读取以及输出文件编码
output=ftb-output         #输出目录
outputFile=output.js      #合并输出文件名
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
    //@ftb actionAlias
    /**
     * @ns com.iflytek.ftb.demo ftb
     * @params $a ftb
     * @params b asdf asdf  ftb
     * @async true ftb
     * @cache true ftb
     * @type GET ftb
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

* 生成目录树结构

```
.
├── com
│   └── iflytek
│       └── ftb
│           └── demo.js
└── output.js
```

```javascript
function asdf(a,b,cb){
    $.ajax({
        url:'http://myftb.com/asdf',
        type:'GET',
        dataType:'json',
        cache:'true',
        async:'true',
        data:{"a":a,"b":b},
        success:function(response){
            cb(response);
        }
    });
}
function anotherAction(cb){
    $.ajax({
        url:'http://myftb.com/anotherAction',
        type:'POST',
        dataType:'json',
        cache:'false',
        async:'true',
        data:{},
        success:function(response){
            cb(response);
        }
    });
}
function actionAlias(a,b,cb){
	$.ajax({
		url:'http://myftb.com/actionAlias',
		type:'GET',
		dataType:'json',
		cache:'true',
		async:'true',
		data:{"a":a,"b":b},
		success:function(response){
			cb(response);
			}
		});
}
```

* 前端引入使用

```html
<script src="./ftb-output/output.js"></script>
<script src="./ftb-output/com/iflytek/ftb/demo.js"></script>
<script>
    var a, b;
    asdf(a, b, function(response){
            //do callback
            });
    anotherAction(function(response){
            //do callback
            });
    actionAlias(a, b, function(reseponse){
            //do callback
        });
</script>
```

###todo
* ~~引入全局配置~~ done
* ~~压缩模式/非压缩模式~~ done
* ~~使用输出模板~~ done
* ~~优化代码组织结构~~ done
* ~~单个注释新增个性化配置项~~ done
* ~~目录遍历读取采取异步模式增加大项目生成效率~~ done
* ~~输出多文件，支持名字空间~~ done
* 异步读取文件配置limit，防止同时打开文件操作符过多系统出错

###联系
hellovigoss@gmail.com   
