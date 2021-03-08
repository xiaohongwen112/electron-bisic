const { ipcRenderer } = require('electron');
const Timer = require('timer.js')

function startWork() {
  let workTimer = new Timer({
    ontick: (ms) => {
      updateTime(ms)
    },
    onend: () => {
      notification()
    }
  }) 
  workTimer.start(3)
}



const updateTime = (ms) => {
  let timerContainer = document.getElementById('time-container')
  timerContainer.innerText = ms
}

const notification = async() => {
  let res = await ipcRenderer.invoke('work-notification')
  if(res === 'reset') {
    setTimeout( () => {
      alert('休息')
    }, 5* 1000)
  } else if(res === 'work') {
    startWork()
  }
}

startWork()