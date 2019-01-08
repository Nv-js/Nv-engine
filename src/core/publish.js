import config from '../config/config'

class publish {
    constructor(){
        this.eventList = {}
    }
    //订阅方法
    subscibe(path,handler){
        let _self = this
        if(!(path in _self.eventList)){
            _self.eventList[path] = []
        }
        if(handler){
            _self.eventList[path].push(handler)
        }
        return _self
    }

    //发布方法
    publish(path){
        let _self = this,
            _args = Array.prototype.slice.call(path, 1)

        if(!(path in _self.eventList)){
            window[config.prefix].log(path + '的方法并没有发布订阅，请核实问题后重试')
        }else{
            _self.eventList[path].forEach(function(ele, index, arr){
                ele.apply(_self,_args);
            })
        }
        return _self
    }

    //删除订阅

    remove(path, handler){
        let _self = this,
            _rets = _self.eventList[path]
        if(_rets){
            _rets.forEach(function(ele, index, arr){
                if(ele ===handler){
                    _self.eventList[path].splice(index,1)
                }
            })
        }
        return _self
    }
}

export default publish