# Nv-engine-v2

---
Nv作为二代引擎，是Zr引擎的重构版本。
优化和修复功能如下：
 + 加载不流畅或者无报错异常 => 完全解决此问题
 + 采用定时器和发布订阅者模式混合状态进行订阅 => 全量发布订阅者模式效率提高30倍+，业务越复杂倍率越高
 + 使用了Es6进行了重构
 + 扩展了诸多方法[详情](/docs/index.md)

### 使用技巧

代码clone下来后，通过yarn方式安装，如果没有安装，请按照[官网流程安装](https://www.yarnpkg.com/zh-Hans/)

安装步骤如下：

```node
$ clone git https://github.com/guguaihaha/Zr-engine-v2.git

$ yarn install

//启动开发环境并同时启动热加载
$ npm run dev

//生成上线压缩并优化的代码
$ npm run build
```
