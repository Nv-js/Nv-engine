import $ from '../tools/tools'
import U from '../tools/utils'
import config from '../config/config'
import loader from './loader'
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
        _this.loadExecute.execute()
    }


    _readyToLoad(){
        let _this = this._this,
            _checkRets         = U.getUnRegisterPath(_this.fixModule, window[config.prefix]),
            length             = _checkRets.length
            
        if(length > 0){
            //执行筛查工作
            _this._route(_checkRets,_this)
        }else{
            //全部都已加载就绪
            _this._bindsAll()
        }
    }

    _bindsAll(){
        let _this = this,
            _M = U.getAllModules(_this.fixModule, window[config.prefix])
        _this.handler(..._M);
    }

    _route(paths,_this){
        let  R = window[config.prefix]

       paths.forEach(function(ele, index, arr){
        //    console.log(ele)
           if(!ele.m){
               //模块未注册，需要注册并加载

           }else{
               //模块已经注册，需要绑定关系
               if(!ele.lock){
                R.global.MODULESLIST[ele.path].lock = 1;
                //虽然注册，检查是否有依赖，有依赖则继续挂起并执行依赖
                
               }
           }
           //挂起被检验的模块
           _this.loadExecute.set(ele.path)

       })
    }
     





}

export default use