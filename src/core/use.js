import $ from '../tools/tools'
import U from '../tools/utils'
import config from '../config/config'
import loader from './loader'
import { cmpstaus } from '../config/global';
class use {
    constructor(){
        let _this = this
        _this.args           = Array.prototype.slice.call(arguments),
        _this.handler        = _this.args[_this.args.length - 1]
        if($.isFunction(_this.handler)){
            _this.handler = _this.args.pop()
        }else if($.isObject(_this.handler)){
            _this.handler = _this.args.pop().success
        }else{
            _this.handler = () => {}
        }
        //路径集合修复
        _this.fixModule = U.fixPaths(_this.args)
        //路径别名补全
        _this.fixModule = U.getCoreModuleList(_this.fixModule, window[config.prefix])
        _this._init();
    }

    _init(){
        var _this = this;
        //判断当前paths是否已经全部加载，没有加载的选项返回，并挂起（包装扩展）回调方法待执行（加载完毕后再执行，再检测）。
        _this.loadExecute = new loader(_this._readyToLoad,_this)
        //第一次强制执行，同时挂起所有未准备就绪的模块
        // _this.loadExecute.execute()
        _this._readyToLoad()
    }

    _readyToLoad(){
        let _this = this
        if(!(this instanceof use)){
            _this = this._this
        }
        let _checkRets         = U.getUnRegisterPath(_this.fixModule, window[config.prefix]),
            length             = _checkRets.length
        if(length > 0){
            //还未绑定或者未注册
            _this._route(_checkRets,_this)
        }else{
            //全部都已加载就绪,全部状态都为SUCCESS
            _this._bindsAll()
        }
    }

    _bindsAll(){
        let _this = this,
            _M = U.getAllModules(_this.fixModule, window[config.prefix])
        _this.handler(..._M);
    }


    //
    
    _route(paths,_this){
        //paths肯定是未加载的或者待绑定的路径集合，所以要全部挂起
        let  R = window[config.prefix],
            _M = R.global.MODULESLIST
        //检查是否有未加载的path，全部加载则执行绑定   
        function _loaderRequest(){
            let _loadRets = [],
                _status = U.isRegisterAllName(paths, R)
                if(_status){
                    //都已注册，检查绑定关系
                    let _requires = U.getAllRequiresPaths(paths, R)
                    //是否有依赖，有依赖则执行依赖回调
                    if(_requires.length){
                        _requires.push(function(){
                            U.bindingAllRelationPaths(paths, R, function(){
                                _this.loadExecute.execute()
                            })
                        })
                        window[config.prefix].use(..._requires)
                        return 
                    }
                    //没有则建立关联，同时执行回调
                    U.bindingAllRelationPaths(paths, R, function(){
                        _this.loadExecute.execute()
                    })
                 }else{
                    //
                    //有未注册的模块
                    let _unregister = []
                        _this._loader  = new loader(_loaderRequest)
                    //筛选未注册的模块，同时加入新的loader队列    
                    paths.forEach(function(ele){
                       if(!ele.m){
                           _unregister.push(ele.path)
                           _this._loader.set(ele.path)
                           U.requestFile(ele.path, _this._loader, R)
                       }
                    })
                 }
        }
        _loaderRequest()
    }

     





}

export default use