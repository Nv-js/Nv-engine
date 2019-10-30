import config from '../config/config'
import $ from '../tools/tools'


function publish(){

}

publish.prototype = {
    constructor:publish,
    eventList:{},
    contains:function(path){
        let _this = this,
            _s = _this.eventList[path]
        if(_s && _s.length > 0){
            return true
        }
        return false
    },
    //订阅方法
    subscibe:function(path,handler){
        let _self = this
        if(!(_self.contains(path))){
            _self.eventList[path] = []
        }
        if(handler){
            _self.eventList[path].push(handler)
        }
        return _self
    },
    //发布方法
    publish:function(path){
        if(!path){
            return
        }
        let _self = this,
            _args = Array.prototype.slice.call(path, 1)

        if(!(_self.contains(path))){
            // window[config.prefix].log(path + '的方法并没有发布订阅，请核实问题后重试')
        }else{
            $.each(_self.eventList[path],function(index,ele){
                ele.apply(_self,_args);
            })
        }
        return _self
    },
    remove:function(path, handler){
        let _self = this,
            _rets = _self.eventList[path]
        if(_rets){
            $.each(_rets,function(index,ele){
                if(ele ===handler){
                    _self.eventList[path].splice(index,1)
                }
            })
        }
        return _self
    }
}









export default publish