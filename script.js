// const sesionValue = document.getElementById('sesion-value')
// const timeBreak = document.getElementById('time-break')
// const addBreak = document.getElementById('add-break')
// const lessBreak = document.getElementById('less-break')
// const  lessWork = document.getElementById('less-work')

const timeLeft = document.getElementById('time-left')
const showWork = document.getElementById('work')
const startStop = document.getElementById('start-stop')
// const addWork = document.getElementById('add-work')
const shortBreak = document.getElementById('short-break')
// const longBreak = document.getElementById('long-break')
let currentLabel = document.getElementById('timer-label')
let audio = new Audio('click.mp3')
let lastAlert = new Audio('chimes.mp3')

let timeOut
let isRunning = true
let workTime =  1 * 60
let breakTime = 2 * 60
// let currentTime = workTime


function toggleTimer() {
    // audio.play()
    if (!timeOut) {
        timeOut = setInterval(updateTime, 100)
        startStop.innerHTML = 'Start'
    } else {
        clearInterval(timeOut)
        timeOut = null
        startStop.innerHTML = 'Resume'
    }
 }

 function reset() {
    audio.play()
    clearInterval(timeOut)
    timeOut = null
   if (isRunning) {
    timeLeft.textContent = '25:00'
   } else {
    timeLeft.textContent = '05:00'
   }
   startStop.innerHTML = 'Start'
}

 function updateTime() {
   if (workTime === 0 && breakTime === 0) {
        alertSound()
        reset()
        isRunning = !isRunning
        if (isRunning && workTime > 0) {
            timeLeft.textContent = '25:00'
        } else {
            timeLeft.textContent = '05:00'
        }
    } 
      else {
      if (isRunning && workTime > 0){
        workTime--
      } else  {
          timeLeft.textContent = breakTime--
          breakTime--
          currentLabel.innerHTML = 'Break'
          console.log(breakTime)
    }
      const minutes = Math.floor(isRunning ? workTime / 60 : breakTime / 60)
      const seconds = isRunning ? workTime % 60 : breakTime % 60
      timeLeft.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
   }
}  

function alertSound() {
  lastAlert.play()
}
 


 document.getElementById('start-stop').addEventListener('click', toggleTimer)
 document.getElementById('reset').addEventListener('click', reset)

