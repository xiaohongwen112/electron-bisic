const { ipcRenderer } = require('electron');
const Timer = require('timer.js')
let workTimer
let allTime = 15 * 60
let nowTime = null

pause.onclick = () => {
  // if (workTimer) return 
  workTimer.pause()
}

play.onclick = () => {
  workTimer.start(nowTime)
}

restart.onclick = () => {
  workTimer.stop()
  workTimer.start(allTime)
}

function startWork() {
  workTimer = new Timer({
    ontick: (ms) => {
      updateTime(ms)
    },
    onend: () => {
      result.innerText = '123123'
      notification()
    }
  }) 
  workTimer.start(allTime)
  console.log('11232222223234422242224444')
}



const updateTime = (ms) => {
  nowTime = (ms / 1000).toFixed(0)
  time.innerText = `${nowTime}s`  
}

const notification = async() => {
  let res = await ipcRenderer.invoke('work-notification')
  result.innerText = res
  if(res === 'reset') {
    workTimer.start(allTime)
  } else if(res === 'work') {
    workTimer.start(allTime)
  }
}

startWork()