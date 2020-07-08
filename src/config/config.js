import theme     from '../tools/theme'

const version = 'v2.3.1',
      prefix  = 'Nv';

const _default = theme()

export default  {
    config : {
        //组件引擎的版本
        version,
        // //基本业务代码的根路径
        baseUrl        : '',
        //公共资源的代码根路径
        cdnUrl         : '//storage.360buyimg.com/vzr/',
        //映射路径模块的配置，禁止使用"./或者/"，只能以别名开头会自动这里去映射
        paths:{},
        //是否开启开发模式，如果开启将会输出报错等调试代码
        development    :  false,
        //是否更新全部版本号，常用语每次上线进行更新（建议更新）
        productVersion : '',
        //默认映射配置文件
        modules        : {
            "dp" : {
                "version" : '1.0.1',
                "path"    : './dp/@version/cdn_index'
            },
            "init" : {
                "version" : '1.0.1',
                "path"    : './init/@version/cdn_index'
            },
            "jquery":{
                "path":"./jqplugins/jquery/@version/cdn_index",
                "version":'1.12.3'
            },
            "jquery3":{
                "path":"./jqplugins/jquery/@version/cdn_index",
                "version":'3.2.1'
            },
            "zepto":{
                "path":"./jqplugins/zepto/@version/cdn_index",
                "version":"1.0.1"
            },
            "perfectscrollbar":{
                "path":"./perfectscrollbar/@version/cdn_index",
                "version":"1.0.1"
            },
            "swiper":{
                "path":"./swiper/@version/cdn_index",
                "version":"1.0.1"
            },
            "echarts":{
                "path":"./echarts/@version/cdn_index",
                "version":"4.0.1"
            },
            "echartsSimple":{
                "path":"./echarts/@version/cdn_echarts-simple",
                "version":"4.0.1"
            },
            "echartsNormal":{
                "path":"./echarts/@version/cdn_echarts-normal",
                "version":"4.0.1"
            },
            "animate":{
                "path":"./animate/@version/cdn_index",
                "version":"1.0.1"
            },
            "compress":{
                "path":"./compress/@version/cdn_index",
                "version":"1.0.1"
            },
            "dragFloat":{
                "path":"./dragFloat/@version/cdn_index",
                "version":"1.0.1"
            },
            "message":{
                "path":"./message/@version/cdn_index",
                "version":"1.0.1"
            },
            "tab":{
                "path":"./tabs/@version/cdn_index",
                "version":"1.0.1"
            },
            "tmpl":{
                "path":"./tmpl/@version/cdn_index",
                "version":"1.0.1"
            },
            "datatables":{
                "path":"./datatables/@version/cdn_index",
                "version":"1.0.1"
            },
            "page":{
                "path":"./page/@version/cdn_index",
                "version":"1.0.1"
            },
            "modal":{
                "path":"./modal/@version/cdn_index",
                "version":"1.0.1"
            },
            "jstree":{
                "path":"./jqplugins/jstree/@version/cdn_index",
                "version":"3.3.5"
            },
            "ztree":{
                "path":"./jqplugins/ztree/@version/cdn_index",
                "version":"1.0.1"
            },
            "mock":{
                "path":"./mock/@version/cdn_index",
                "version":"1.0.1"
            },
            "datePicker":{
                "path":"./datePicker/@version/cdn_index",
                "version":"1.0.1"
            },
            "notification":{
                "path":"./notification/@version/cdn_index",
                "version":"1.0.1"
            },
            "affix":{
                "path":"./affix/@version/cdn_index",
                "version":"1.0.1"
            },
            "popover":{
                "path":"./popover/@version/cdn_index",
                "version":"1.0.1"
            },
            "tag":{
                "path":"./tag/@version/cdn_index",
                "version":"1.0.1"
            },
            "ajaxForm":{
                "path":"./jqplugins/jqueryForm/@version/cdn_index",
                "version":"35"
            },
            "progress":{
                "path":"./progress/@version/cdn_index",
                "version":"1.0.1"
            },
            "fixedColumns":{
                "path":"./datatables/@version/cdn_fixedColumns",
                "version":"1.0.1"
            }
        },
        //主题色
        theme           : _default,
        //语言设置：详情见多语言文档
        language        : 'zh_CN'
        // storage         : {
        //     //存储方式：'static'、'session'、'local'
        //     type        : 'static',
        //     //存储别名，请勿更改，否则无法找到缓存文件
        //     name        : 'M8duJDH82NMDH928JDHsiJHDN',
        //     //当前版本号，如果版本与缓存版本不同，则清空缓存并同时重载，请勿更改，否则会强制更新所有缓存文件
        //     version     : '20190101'
        // }
    },
    prefix
}      