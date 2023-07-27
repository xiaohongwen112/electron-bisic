const { ipcRenderer } = require('electron');
const Timer = require('timer.js')
let workTimer
let allTime = 60 * 15
let nowTime = null
let frequencyTime = 0
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
      notification()
    }
  }) 
  workTimer.start(allTime)
  console.log('1122221111141111442222111')
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
  frequencyTime++
  frequency.innerText = Math.ceil((frequencyTime / 3))
}

startWork()