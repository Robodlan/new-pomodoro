const timeLeft = document.getElementById('time-left')
const startStop = document.getElementById('start-stop')
const addWorkInput = document.getElementById('add-work')
const addBreakInput = document.getElementById('add-break')
let currentLabel = document.getElementById('timer-label')
let audio = new Audio('click.mp3')
let lastAlert = new Audio('chimes.mp3')

let timeOut
let isRunning = true
let add = 1 * 60
let workMinutes = 25
let workSeconds = 60
let breakMinutes = 5
let breakSeconds = 60
let workTime =  `${workMinutes}` * `${workSeconds}`
let breakTime = `${breakMinutes}` * `${breakSeconds}`

function addWork(){
   workMinutes += 1 
   addWorkInput.value = workMinutes
   workTime =  `${workMinutes}` * `${workSeconds}`
   timeLeft.textContent = formatTime(workTime)
   console.log(workTime)
}

function addBreak(){
   breakMinutes += 1
   addBreakInput.value = breakMinutes
   breakTime = `${breakMinutes}` * `${breakSeconds}`
   timeLeft.textContent = formatTime(isRunning ? workTime : breakTime)
}


function toggleTimer() {
  addWorkInput.value = ''
    audio.play()
    if (!timeOut) {
        timeOut = setInterval(updateTime, 10)
        startStop.innerHTML = 'Pause'
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
    workTime = 25 * 60
    timeLeft.textContent = '25:00'
    startStop.innerHTML = 'Start'
}

 function updateTime() {
  if (isRunning) {
    workTime--
    if (workTime < 0) {
      isRunning = false
      currentLabel.innerHTML = 'Break'
      timeLeft.textContent = formatTime(breakTime)
    }
  } else {
    breakTime--
    if (breakTime <= 0){
      isRunning = false
      currentLabel.innerHTML = 'Done!'
      startStop.innerHTML = 'Start'
      timeLeft.textContent = formatTime(workTime)
      clearInterval(timeOut)
      lastAlert.play()
    }
  }
  timeLeft.textContent = formatTime(isRunning ? workTime : breakTime)
  document.title = `${formatTime(isRunning ? workTime : breakTime)} ${'🍅'}`
}  

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')} : ${remainingSeconds.toString().padStart(2, '0')}`
}

 document.getElementById('start-stop').addEventListener('click', toggleTimer)
 document.getElementById('reset').addEventListener('click', reset)
 document.getElementById('add-work-btn').addEventListener('click', addWork)
 document.getElementById('add-break-btn').addEventListener('click', addBreak)


 
 
 


