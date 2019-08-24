import theme     from '../tools/theme'
const version = "2.0.1",
      prefix  = "Zr";

const _default = theme()

export default  {
    config : {
        //组件引擎的版本
        version,
        //基本业务代码的根路径
        baseUrl        : '',
        //公共资源的代码根路径
        cdnUrl         : '//storage.360buyimg.com/vzr/',
        //是否开启开发模式，如果开启将会输出报错等调试代码
        development    :  false,
        //是否更新全部版本号，常用语每次上线进行更新（建议更新）
        productVersion : '',
        //默认映射配置文件
        modules        : {
            dp : {
                version : '1.0.1',
                path    : './dp/@version/cdn_index'
            },
            init : {
                version : '1.0.1',
                path    : './init/@version/cdn_index'
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