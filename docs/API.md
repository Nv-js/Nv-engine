Nv的API
---

> 快速导航

  + [Nv.use](#user-content-use) 
  
  + [Nv.add](#user-content-add)
  
  + [Nv.document](#user-content-document)
  
  + [Nv.window](#user-content-window)
  
  + [Nv.alias](#user-content-alias)
  
  + [Nv.config](#user-content-config)
  
  + [Nv.extend](#user-content-extend)
  
  + [Nv.tools](#user-content-tools)

```html

```

> Nv.use <span id="use">#</span>

- 语法：
` Nv.use(param1,param2,...,callback)`

- 入参类型：

   + `{String}  param1,param2,...`  
   
   + `{Function}  callback`

- 参数解析：
  
  + param1,param2,... 是可以支持同时调用多个组件名或者组件路径（一定是Nv.add）封装的，如果调用
  其他的非Nv封装，请参考Nv.require。
  
  + callback 是回调钩子，钩子结构function(nv,callbackParam1,callbackParam2,...),第一个参数永远是Nv对象，
  第二个参数开始是对应use的对象入参顺序。如果use对象过多可以参考使用nv.alias 来使用
  

- 参考用法：[使用方法](//github.com/guguaihaha/Nv-engine/issues/4)

<br/>
<br/>
<br/>

```html

```

> Nv.add <span id="add">#</span>

- 语法：
` Nv.add(param,callback,options)`

- 入参类型：
  + `{String}  param`
  
  + `{Function}  callback`
  
  + `{Object} options`
  
- 参数解析：

  + param   是组件路径，相对于[Nv.config](#config)中baseUrl的路径,也是Nv.use的使用路径，名称对应
  
  + callback 是回调钩子，钩子结构function(nv,callbackParam1,callbackParam2,...),第一个参数永远是nv对象，
  第二个参数开始是对应入参中options.requires的数组中的顺序。当然如果options.requires对象过多可以参考nv.alias来使用
  
  + options 是配置项目，目前包含两个对象{alias:"aliasName",requires:["param1","param2",...]}
  
- 参考用法：[使用方法](//github.com/guguaihaha/nv-engine/issues/5) 
 
 <br/>
 <br/>
 <br/>
 
 ```html
 
 ```
 
 > Nv.document <span id="document">#</span>
 
 - 语法：
 `Nv.document`
 
 - 参考用法：直接调用即可，防止全局document污染。
 
    <br/>
    <br/>
    <br/>
    
    ```html
    
    ```
 
 > Nv.window <span id="window">#</span>
 
 - 语法：
 `Nv.window`
 
 - 参考用法：直接调用即可，防止全局window污染
 
   <br/>
   <br/>
   <br/>
   
   ```html
   
   ```
   
 > Nv.alias <span id="alias">#</span> 
 
 - 语法：
 `Nv.alias`
 
 - 用法：
 此方法直接在Nv.use或者Nv.add方法的回调函数中第一个参数调用。用于快速获取具有别名的组件
 
 - 参考用法：[使用方法](//github.com/guguaihaha/nv-engine/issues/4#user-content-alias)
 
<br/>
<br/>
<br/>

```html

```

> Nv.config <span id="config">#</span>

 - 语法：
 `Nv.config(options)`
 
 - 入参类型：
   
   `{Object}  options`
 
 - 参数解析：
 
   + options.baseUrl   （String）
   
     **必填字段**，配置业务js和css等静态资源代码库地址，可以是项目中地址，也可以是线上CDN等地址
     
   <br/>
   
   + options.development   (Bolean)
   
     **选填**，是否是开发模式，开发模式将会开启报错提醒、非压缩格式、异常提醒和防止缓存等，默认是'false'上线模式
     
   <br/>     
     
   + options.version  (String)
   
     **选填**，显示当前Nv的版本信息
     
   <br/>
   
    + options.theme  (String)
      
     **不建议修改**，默认读取link标签中带有 **data-theme**属性的主题。如果不添加则读取主题色'极客蓝'（默认主题）
        
        
    <br/>  
     
   + options.language  (String)
   
     **选填**，当前语言环境，设置将会影响所有组件的显示，组件会默认语言会依据此设置，如果组件需要单独配置语言，请根据组件文档另行配置。
     
     [所有语言格式](language.md)
     
   <br/>
   
     
   + options.requestVersion  (String)
   
     **选填**，用于更新线上环境所有Nv的异步组件当前版本信息，常用于发版清除缓存，建议每次发布新版本增加次版本号，内容自己定义
     
   <br/>
   
     
   + options.cdnUrl  (String)
   
     **选填**，指向公共资源库地址，文件命名格式："cdn_**.js"即可，默认指向：//storage.360buyimg.com/的京东CDN服务器
     
   <br/>
             
   + options.module  (Object)
   
     **选填**，配置Nv.use使用的别名,具体结构如下
     
     ```javascript
      Nv.config({
        "module":{
            //模块别名名称
            "jquery":{
              //配置的寻址路径
              "path":"./jquery/@version/index",
              "version":"1.12.3"
            },
            "main":{
              "path":"./main/@version/index.js",
              "version":"13.2.1"
            }
        }
      })
 
      Nv.ready(function(){
         Nv.use("jquery","jquery3",function(nv,$,m){
            //$ 代表jquery1.12.3的版本
            //m 代表main13.2.1的版本
         })
      })
 
     ```
    以上配置中以`"key":{"path":"","version":""}`中结构为主，其中key是use使用别名的名称，path是对应的实际路径，其中@version就是以下version的版本信息。
    因为每个组件的版本有可能不同，请根据项目需要自行引入
 
 - 参考用法：[使用方法](//github.com/guguaihaha/Nv-engine/issues/6)
 
 <br/>
 <br/>
 <br/>
 
 ```html
 
 ```
 
 
 > Nv.extend <span id="extend">#</span>
 
 - 语法：
 ` Nv.extend(deep,parent,child)`
 
 - 入参类型：
 
   + `{Boolean}  deep`
   
   + `{Object}  parent`
   
   + `{Object} child`
   
 - 返回类型：
  
  `{Object} @return`
  
  返回一个key相同则覆盖父类，父类没有的对象则合并的新对象。
   
 - 参数解析：
 
   + deep
   
   **选填** 是否需要深度copy，默认是false
   
   + parent 
   
   **必填** 被继承的父类对象
   
   + child 
   
   **必填** 继承的子对象
   
 - 参考用法：[使用方法](//github.com/guguaihaha/Nv-engine/issues/7) 
  <br/>
  <br/>
  <br/>
  
  ```html
  
  ```
 
  > Nv.tools <span id="tools">#</span>
  
  - 语法：
  ` Nv.tools`
    
  - 返回类型：
   
   `{Object} @return`
   
   返回一个包含多种工具类方法的对象，具体包含方法如下
   
   `var tools = Nv.tools`
   
   + tools.bind(func, object, param1, param2, ...)
   
     * func
     
       ***必填***，被绑定的函数
     
     * object
     
       ***必填***，绑定指向的对象
       
     * param1,param2,...
     
       ***选填***，[入参] 绑定后参数一函数（func）执行时候的参数
       
   [参考用法](//github.com/guguaihaha/Nv-engine/issues/8)
    
   <br/>
   
---
          
   + tools.each(object, callback)
      
     * object
       
       ***必填***，对象或者数组
     
     * callback
       ***必填***，遍历调用的方法，参数如下：
       
       `callback(key, value)`
       
       其中key为对象的键，value对应对象的值
                  
   [参考用法](//github.com/guguaihaha/Nv-engine/issues/9) 
  
   <br/>
   
---
   
   + tools.endWidth(path/url, suffix)
   
     * path/url
     
       ***必填***，文件路径或者url
     
     * suffix
     
       ***必填***，以定义的名称结尾，常用语判断是否是css、js、html等文件特征检测
   
     * 返回类型：
        
        `{Bollean} @return`
        
        返回true或者false
        
     <br/>
     
---
     
   + tools.extname(path/url)
                
     * path/url
     
       ***必填***，获取文件或者域名的格式类型
       
     * 返回类型：
               
        `{String} @return`
       
        返回获取的结尾名称，比如
        
        `tools.extname('/a/b/c.html')`
        
        结果为
        
        `.html`
       
   <br/>
   
---
   
   + tools.isArray(Object)
   
     * Object
     
     ***必填***，判断对象是否是数组
     
     * 返回类型：
     
      `{Boolean} @return`    
        
      返回的是Boolean，true代表是，false代表否    
      
   <br/>
   
---
   
   + tools.isBoolean(Object)
   
     * Object
     
     ***必填***，判断对象是否是布尔值
     
     * 返回类型：
     
      `{Boolean} @return`    
        
      返回的是Boolean，true代表是，false代表否      
      
   <br/>
   
---
   
   + tools.isDate(Object)
   
     * Object
     
     ***必填***，判断对象是否是日期类型
     
     * 返回类型：
     
      `{Boolean} @return`    
        
      返回的是Boolean，true代表是，false代表否 
      
   <br/>
   
   ---
      
   + tools.isEmptyObject(Object)
   
     * Object
     
     ***必填***，判断对象是否是空对象
     
     * 返回类型：
     
      `{Boolean} @return`    
        
      返回的是Boolean，true代表是，false代表否   
      
   <br/>
   
   ---
      
   + tools.isFunction(Object)
   
     * Object
     
     ***必填***，判断对象是否是函数
     
     * 返回类型：
     
      `{Boolean} @return`    
        
      返回的是Boolean，true代表是，false代表否       
      
   <br/>
   
   ---
      
   + tools.isNull(Object)
   
     * Object
     
     ***必填***，判断对象是否是Null对象
     
     * 返回类型：
     
      `{Boolean} @return`    
        
      返回的是Boolean，true代表是，false代表否  
      
   <br/>
   
   ---
      
   + tools.isNumber(Object)
   
     * Object
     
     ***必填***，判断对象是否是数字类型
     
     * 返回类型：
     
      `{Boolean} @return`    
        
      返回的是Boolean，true代表是，false代表否    
      
   <br/>
   
   ---
      
   + tools.isObject(Object)
   
     * Object
     
     ***必填***，判断对象是否是原生对象
     
     * 返回类型：
     
      `{Boolean} @return`    
        
      返回的是Boolean，true代表是，false代表否 
      
   <br/>
   
   ---
      
   + tools.isPlainObject(Object)
   
     * Object
     
     ***必填***，判断对象是否是Nv的对象
     
     * 返回类型：
     
      `{Boolean} @return`    
        
      返回的是Boolean，true代表是，false代表否   
      
   <br/>
   
   ---
      
   + tools.isRegExp(Object)
   
     * Object
     
     ***必填***，判断对象是否是正则
     
     * 返回类型：
     
      `{Boolean} @return`    
        
      返回的是Boolean，true代表是，false代表否  
      
   <br/>
   
   ---
      
   + tools.isString(Object)
   
     * Object
     
     ***必填***，判断对象是否是正则
     
     * 返回类型：
     
      `{Boolean} @return`    
        
      返回的是Boolean，true代表是，false代表否 
      
   <br/>
   
   ---
      
   + tools.isUndefined(Object)
   
     * Object
     
     ***必填***，判断对象是否是undefined
     
     * 返回类型：
     
      `{Boolean} @return`    
        
      返回的是Boolean，true代表是，false代表否 
      
   <br/>
   
   ---
      
   + tools.keys(Object)
   
     * Object
     
     ***必填***，获取Object对象的键
     
     * 返回类型：
     
      `{Array} @return`    
        
      返回的是该对象的键
      
      `var key = tools.key({'index':'1927361','others':'oks'})`
      
      返回的key数值为
      
      `['index','others']`
      
   <br/>  
   
   --- 
      
   + tools.values(Object)
   
     * Object
     
     ***必填***，获取Object对象的值
     
     * 返回类型：
     
      `{Array} @return`    
        
      返回的是该对象的键
      
      `var key = tools.key({'index':'1927361','others':'oks'})`
      
      返回的key数值为
      
      `['1927361','oks']`
      
   <br/>   
   
   ---
      
   + tools.later(Callback, Time, IsInterval)
   
     这是一个替代setTimeout和interval的方法，不用关心具体执行后的返回对象主体，直接@return.cancel即可取消
   
     * Callback
     
     类型：Function
     
     ***必填***,回调函数，内部执行的方法
     
     * Time
     
     类型：Number
     
     ***必填***，间隔执行时间,单位是ms（毫秒）
     
     * IsInterval
     
     类型：Boolean
     
     ***选填***，true或者false,是否使用interval，默认是timeout(false)。
     
     * 返回类型：
     
      `{Object} @return`    
        
      返回的是一个对象，包含如下内容
      
      - @return.id
        
        当前定时器的唯一标识
        
      - @return.interval
      
        当前是执行一次返回**false**，循环执行返回**true**
      
      - @return.cancel
      
        取消当前定时器方法
       
      [参考用法](//github.com/guguaihaha/Nv-engine/issues/10)  
            
   <br/>   
   
   ---
      
   + tools.size(Object)
   
     * Object
     
     ***必填***，对象具有的长度
     
     * 返回类型：
     
      `{Number} @return`
      
     * 示例:
     
     `Nv.tools.size({a:1,b:2,c:3})`
     
     结果是
     
     `3`
     
     当然数组也是可以的
     
   <br/>     
   
   ---
     
   + tools.stringArray(Object)      
   
     * Object
     
     ***必填***，针对字符串转化为数组
     
     * 返回类型：
     
      `{Array} @return`
      
     * 示例:
     
     `Nv.tools.stringArray('1,2,3,4')`
     
     结果是
     
     `[1,2,3,4]`
     
     
   <br/>        
   
   ---
   
  + tools.trim(StringObject)
  
     * StringObject
     
     ***必填***，去掉首位空格
     
     * 返回类型：
     
      `{String} @return`
      
     * 示例:
     
     `Nv.tools.trim(' My first words ')`
     
     结果是
     
     `My first words`
     
     <br/>
     
     ---
     
  + tools.cookie(Key, Value, Time)
  
     获取cookie或者设置cookie   
  
     * Key
     
     ***必填***，设置/获取cookie的关键字
     
     * Value
     
     ***选填***，设置cookie的值，一定是String类型
     
     * Time
     
     ***选填***，设置cookie过期时间，默认是30天，单位是（天）可以设置0.1、1、2.3、5等
     
     * 返回类型：
     
      `{String} @return`
      
     * 示例，我的cookie当中有个pin的值是Pro，如果以下:
     
     `Nv.tools.cookie('pin')`
     
     结果是
     
     `Pro`
     
     如果想要更改pin的cookie也很简单：
     
     `Nv.tools.cookie('pin', 'guguaihaha', 2)`
     
     这时候`pin`更改为`guguaihaha`同时只有`2天`有效期
     
  <br/>
  
  ---
     
  + tools.storage(Which, Key, Value)
  
     设置缓存，支持session和local两种  
  
     * Which
     
     ***选填***，不填或者设置成false则调用local存储类型，设置true则调用session存储
     
     * Key
     
     ***选填***，设置存储的键
     
     * Value
     
     ***选填***，设置存储的键对应的值，一定是String类型的
       
     * 示例，设置session类型的临时存储，以下:
     
     `Nv.tools.storage(true,'pin','{a:1,b:2}')`
     
     获取该结果时候
     
     `Nv.tools.storage(true,'pin')`
     
     会获取到String类型的对象
     
     `"{a:1,b:2}"`
     
     当然还有清除单独值缓存或者清除所有缓存，具体参考如下：
     
     [参考用法](//github.com/guguaihaha/Nv-engine/issues/11)
     
     <br/>
     
     ---
     
  + tools.browser
  
     浏览器特征检测，很实用
  
     * 返回类型：
     
      `{Object} @return`
  
      - @return.versions
     
      返回当前浏览器版本号
     
      - @return.language
     
      返回当前浏览器语言环境
     
      - @return.versions
     
      返回当前浏览器检测包，里面包含如下
       
      - @return.versions.trident 
        
        IE内核 是则返回true
        
      - @return.versions.presto 
      
        opera内核 是则返回true
      
      - @return.versions.webKit
       
        苹果、谷歌内核 是则返回true
        
      - @return.versions.gecko
       
        火狐内核 是则返回true
       
      - @return.versions.mobile
       
        是否为移动终端 是则返回true
        
      - @return.versions.ios ios
      
        终端 是则返回true
        
      - @return.versions.android android
      
        终端或者uc浏览器 是则返回true
        
      - @return.versions.iPhone
       
        是否为iPhone或者QQHD浏览器 是则返回true
        
      - @return.versions.iPad
       
        是否iPad 是则返回true
        
      - @return.versions.isSupportTouch
       
        是否支持touch 是则返回true
        
      - @return.versions.webApp
       
        是否web应该程序，没有头部与底部 是则返回true
     
  <br/>
  
  ---
  
   + tools.format(Fmt, Time)      
   
     * Fmt
     
     ***必填***，格式化的类型符号：
     
     `yyyy-MM-dd hh:mm:ss SSSS`
     
     当然还支持季度，季度的代表符号是：`q`
     
     * Time
     
     ***必填***，格式为`Date`、`String`、`Number`类型
     
     * 返回类型：
     
      `{String} @return`
      
     * 示例:
     
     `Nv.tools.format('yyyy-MM-dd', new Date())`
     
     结果是
     
     `2019-01-01`
     
     当然也支持`String`、`Number`的类型
     
   <br/>
   
   ---
   
   + tools.splitNumber(Number, Split, Qt)
   
     分割数字格式      
   
     * Number
     
     ***必填***，字符串或者数字类型
     
     * Split
     
     ***选填***，按照几位进行分割，默认是3
     
     * Qt
     
     ***选填***，以什么样的字符进行分割，默认是','
     
     * 返回类型：
     
      `{String} @return`
      
     * 示例:
     
     `Nv.tools.splitNumber('1827319837987922437')`
     
     结果是
     
     `1,827,319,837,987,922,437`
  
   <br/>
   
   ---
   
   + tools.splitMoney(moneyNumber)
   
     自动转化为万，采用四舍五入      
   
     * moneyNumber
     
     ***必填***，数字类型
     
     * 返回类型：
     
      `{Number} @return`
      
     * 示例:
     
     `Nv.tools.splitMoney('987263.45')`
     
     结果是
     
     `98.73万`
  
   <br/>   
   
   ---
   
    
   + tools.transUrl(search)
   
     转换url的参数为js对象      
   
     * search
     
     ***必填***，传入的Url链接
     
     * 返回类型：
     
      `{Number} @return`
      
     * 示例:
     
     `Nv.tools.splitMoney('987263.45')`
     
     结果是
     
     `98.73万`
  
   <br/>         
      
           
 