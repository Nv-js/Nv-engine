import tools     from './tools/tools'
import file      from './tools/getFile'
import module    from './core/module'
import publish   from './core/publish'
import getFile   from './tools/getFile'
import {global,log,throwError,cmpstaus}    from './config/global'

let _T = {
      document:window.document,
      window:window,
      tools,
      request:(url, callback) => {
            const _f = new file(url, callback);
            _f.request();
      },
      add:module.add,
      use:module.use,
      config:module.config,
      baseConfig:global.CONFIG,
      require:getFile,
      extend:tools.extend,
      global,
      log,
      throwError,
      cmpstaus,
      _pub:new publish(),
      readyQueen:[],
      ready:function(fn){
            _T.readyQueen.push(fn)
      }     
}

if(!window[global.PREFIX]){
      //发布订阅初始化
      //
      //
      window[global.PREFIX] = _T
      window[global.PREFIX].tools.later(function(){
            // window[global.PREFIX].use('zr',function(){
            //       window[global.PREFIX].readyQueen.forEach(function(ele){
            //             ele()
            //       })
            // })
      },0)

}