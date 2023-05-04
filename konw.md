# electron 

## 编辑器 
采用vscode 

## 环境
安装nodejs

## mvn建议安装

## electron 安装
cnpm i electron -D

## 运行平台
在32位 环境下运行，这样只需要维护一套，可以再32 64上运行
cnpm i --arch=ia32 --platform=win32 electron 

## 优化安装
优化镜像源：
ELECTRON_MIRROR=https://cdn.npm.taobao.org/dist/electron npm install electron -D


## IPC通讯
```js
const {app, BrowserWindow } = require('electron') // 主进程引入app,browserWindow模块
const { ipcRenderer } = require('electron')// 渲染进程引入ipcRenderer
ipcRenderer.invoke(channel, ...args).then(res => {handleResult}) // 渲染进程跟主进程发送请求
```

## electron 主进程模块
app用于控制应用的生命周期
browserWindow 用于创建和控制窗口
```js
let win = new BrowserWindow({width,height,...})// 创建窗口
win.loadURL(url), win.loadFilr(path) // 加载页面
```
### Notification， 创建Notification
```js
let notification = new Notification({title, body, actions:[{text,type}]})
notification.show()
```
### ipcMain
```js
ipcMain.handle(channel,handler) // 处理渲染进程的channel请求，在handler中return返回结果
```

ces