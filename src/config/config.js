import theme     from '../tools/theme'

const version = 'v2.0.1',
      prefix  = 'Nv';

const _default = theme()

export default  {
    config : {
        //组件引擎的版本
        version,
        // //基本业务代码的根路径
        baseUrl        : '',
        //公共资源的代码根路径
        cdnUrl         : '//static.360buyimg.com/',
        //映射路径模块的配置，禁止使用"./或者/"，只能以别名开头会自动这里去映射
        paths:{},
        //是否开启开发模式，如果开启将会输出报错等调试代码
        development    :  false,
        //是否更新全部版本号，常用语每次上线进行更新（建议更新）
        productVersion : '',
        //默认映射配置文件
        modules        : {
            "jquery":{
                "path":"./fw.base/1.0.0/components/jqplugins/jquery/@version/cdn_index",
                "version":'1.12.3'
            },
            "jquery3":{
                "path":"./fw.base/1.0.0/components/jqplugins/jquery/@version/cdn_index",
                "version":'3.2.1'
            },
            "ajaxForm":{
                "path":"./fw.base/1.0.0/components/jqplugins/jquery/jqueryform/@version/cdn_index",
                "version":"35"
            },
            "tmpl": {
                "path": "./fw.base/1.0.0/components/tmpl/@version/cdn_index",
                "version": "1.0.1"
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