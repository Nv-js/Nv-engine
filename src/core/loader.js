import config from '../config/config'
import $ from '../tools/tools'
class loader {
    constructor(handler,_R){
        this.handler = handler
        this.queue = {}
        this.error = []
        if(_R){
            this._this = _R
        }
    }


    execute(){
        if(this.handler && this.error.length == 0){
            if(this.handler){
                this.handler()
                //执行依次即失效，所以慎重。如果出现页面无报错不加载后续流程，就是此处重复加载导致
                this.handler = null
            }else{
                window[config.prefix].throwError('重复加载回调，请检查')
            }
            
            
        }else if(this.error.length > 0){
            let e = window[config.prefix].throwError
            this.error.forEach(function(err){
                e(err.msg + '模块路径：'+ err.path)
            })
        }
    }

    set(path){
        let _this = this;
        if($.isArray(path)){
            path.forEach(function(ele){
                _this.queue[ele] = 1
            })
        }else{
            _this.queue[path] = 1
        }
    }

    delete(path){
        delete this.queue[path]
    }

    get(path){
        return this.queue[path]
    }

    error(path, msg){
        this.error.push({
            path,
            msg
        })
    }

    isEmpty(){
        return Object.keys(this.queue).length === 0 ? 1 : 0
    }


}

export default loader