import tools     from './tools/tools'
import file      from './tools/getFile'
import module    from './core/module'
import publish   from './core/publish'
import {global,log,throwError,cmpstaus}    from './config/global'


let _T = {
      tools,
      request:(url, callback) => {
            const _f = new file(url, callback);
            _f.request();
      },
      add:module.add,
      use:module.use,
      global,
      log,
      throwError,
      cmpstaus,
      config:global.CONFIG,
      _pub:new publish()     
}

if(!window[global.PREFIX]){
      //发布订阅初始化
      //
      //
      window[global.PREFIX] = _T
}