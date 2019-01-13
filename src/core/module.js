import $ from '../tools/tools'
import add from '../core/add'
import use from '../core/use'
import _config  from '../config/config'


const storage = (config) => {
   let _storage = config.storage,
       _type = ''
       switch (_storage.type){
          case 'session' :
          _type = true
          break
          case 'local' :
          _type = false
          break
          default :
          _type = ''
       }
       if(_type){
         //每次刷新页面都会重载这个方法来获取存储的数据
         let _default = $.storage(_type, _storage.name)
         if(!_default){
            return
         }
         _default = JSON.parse(_default)
         let _v = _default.version,
             _n = _config.config.storage.version

         if(_v === _n){
            $.extend(true,_config.config,_default)
         }else{
            //清楚所有相关数据
            $.storage(_type, _storage.name,true)
         }    
       }
}



const addModule = (name, factory, config) => {
   let _add = new add(name, factory, config)
}

const useModule = function(){
   let _args = Array.prototype.slice.call(arguments),
       _use = new use(..._args) 
}

const configModule = function(config){
    $.extend(true,_config.config,config)
   //  storage(_config.config)
}
export default {
   add     : addModule,
   use     : useModule,
   config  : configModule
}