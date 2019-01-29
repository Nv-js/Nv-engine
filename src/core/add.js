import $ from '../tools/tools'
import U from '../tools/utils'
import {global,cmpstaus} from '../config/global'

class add {
    constructor(name, factory, config){
        this.name = name
        this.factory = factory
        this.config = config || {}
        //初始化解析
        if(arguments.length === 3 && ($.isArray(factory) || $.isObject(factory))){
            let _o = factory;
            this.factory = config;
            this.config = _o;
        }
        this._init()
    }
    
    _init(){
        let _this = this,
            _R = window[global.PREFIX],
            _deps = U.getFixRequiresPaths(_this,_R),
            _config = {
                ..._this.config,
                factory   : _this.factory,
                _exports    : '',
                name      : U.fixPathItem(_this.name),
                requires  : _deps,
                status    : cmpstaus.LOADED,
                lock      : 0
            }
        //注册模块到核心库上
        U.register(_config,_R)
        //发布订阅注册，便于后续通知，当然此处也可以不进行注册，目前此行为语法糖，用于演示页面添加的流程。
        // _R._pub.subscibe(_this.name);      
    }
}


export default add