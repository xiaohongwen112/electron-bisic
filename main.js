const { app, BrowserWindow, ipcMain, Notification }  = require('electron')

let win // 不挂在全局，垃圾回收机制，win可能被清理掉，突然程序关闭
app.on('ready', ()=>{
  win = new BrowserWindow({
    width: 300,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      // contextIsolation: false,
      // just add this row
      // enableRemoteModule: true
    }
  })
  win.loadFile('./index.html')
  handleIPC()
})

// ipcMain.on('work-notification',()=>{
//   let notification = new Notification({
//     title: '任务结束',
//     body: '是否开始休息',
//     actions: [{text:'开始休息',type:'button'}],
//     // closeButton: '继续工作'
//   })
//   notification.show()
//   return 'reset'
// })

const handleIPC = () => {  //响应事件
  ipcMain.handle('work-notification', async function() {
    let res = await new Promise((reslove,reject)=>{
      let notification = new Notification({
        title: '任务结束',
        body: '是否开始休息',
        actions: [{text:'开始休息',type:'button'}],
        // closeButton: '继续工作'
      })
      notification.show()
      notification.on('action', () => { // 确定按钮
        reslove('reset')
      })
      notification.on('close', () => { // 关闭按钮
        reslove('work')
      })
    })
    return res
  })
}