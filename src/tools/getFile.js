import $ from './tools'

class loadFile {
    constructor(url,success,charset) {
        //存入初始化数据
        this.url = url

        this.success = success

        this.charset = charset

        this.error = function(){}

        this.charset = ""

        this.attrs = ""
        
        //文件格式类型
        this.type = $.extname(url).split('.')[1].split('?')[0]
        //文件重复加载
        this.repeat = {}

        this.timeout = 10
   
        this.headNode = ""
        
        if($.isObject(success)){
            this.success = success.success

            this.error = success.error

            this.timeout = success.timeout || this.timeout

            this.charset = success.charset || this.charset

            this.attrs = success.attrs
        }

    }

    request(){
        let _this = this;

        let node = document.createElement(_this.type === 'css' ? 'link' : 'script')

        if(_this.attrs){
            $.each(_this.attrs, function(key, value){
                node.setAttribute(key, value)
            })
        }

        if(_this.charset){
            node.charset = _this.charset
        }

        let loadStatus = 'onload' in node,

            readyEvent = loadStatus ? 'onload' : 'onreadystatechange';

        node.onerror = function(){
            _this.error(_this.url,node,'Load error , please check')
        }
        node[readyEvent] = function(){
            if(readyEvent == 'onload'){
                _success()
            }else{
                if(/loaded|complete/.test(node.readyState)){
                    _success()
                }
            }
        }


        function _success(){
            node.onreadystatechange = node.onload = null;
            _this._timer.cancel()
            let ie = $.browser.ieVersion()
            _this.success()
        }

        if(_this.timeout){
        _this._timer = $.later(function(){
                _this.error(_this.url,node,'load timeout , please check')
            },_this.timeout*1000)
        }

        if(!_this.headNode){
            _this.headNode = document.getElementsByTagName("head")[0] || document.documentElement;
        }

        switch (_this.type){
            case 'css':
            node.rel = 'stylesheet'
            node.href = _this.url
            _this.headNode.appendChild(node)
            break

            default:
            node.src = _this.url
            node.async = true
            _this.headNode.insertBefore(node,_this.headNode.firstChild)
            break
        }
    }

}

export default loadFile


