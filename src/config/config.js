const version = 'v2.0.0',
      prefix  = 'Zr';

export default  {
    config : {
        version,
        baseUrl        : '',
        cdnUrl         : '//storage.360buyimg.com/"+version+"/',
        development    :  false,
        productVersion : '',
        modules        : {
            init : {
                version : '1.0.0',
                path    : './init/@version/cdn_index'
            },
            dp : {
                version : '1.0.0',
                path    : './dp/@version/cdn_index'
            }
        },
        language       : 'zh_CN'
    },
    prefix
}      