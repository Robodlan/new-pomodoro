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
  if (!timeOut  ) {
    currentLabel.innerHTML = "Work"
     workMinutes += 1 
     addWorkInput.value = workMinutes
     workTime =  `${workMinutes}` * `${workSeconds}`
     timeLeft.textContent = formatTime(workTime)
  } else {
   workMinutes = 25  
 }
}

function lessWork() {
  if (!timeOut) {
    currentLabel.innerHTML = "Work"
    workMinutes -= 1
    addWorkInput.value = workMinutes
    workTime =  `${workMinutes}` * `${workSeconds}`
    timeLeft.textContent = formatTime(workTime)
  } else {
    workMinutes
  }
}

function addBreak(){
  //  currentLabel.innerHTML = "Break"
   breakMinutes += 1
   addBreakInput.value = breakMinutes
   breakTime = `${breakMinutes}` * `${breakSeconds}`
  
}

function lessBreak() {
  // currentLabel.innerHTML = "Break"
  breakMinutes -= 1
  addBreakInput.value = breakMinutes
  breakTime = `${breakMinutes}` * `${breakSeconds}`
}


function toggleTimer() {
    addWorkInput.value = ''
    audio.play()
    if (!timeOut) {
        timeOut = setInterval(updateTime, 1000)
        startStop.innerHTML = 'Pause'
    } else {
        clearInterval(timeOut)
        timeOut = null
        startStop.innerHTML = 'Resume'
        // addWorkInput.value = workMinutes
        breakTime
    }
 }

 function reset() {
    addWorkInput.value = ''
    addBreakInput.value = ''
    currentLabel.innerHTML = 'Work'
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
 document.getElementById('less-work-btn').addEventListener('click', lessWork)
 document.getElementById('add-break-btn').addEventListener('click', addBreak)
 document.getElementById('less-break-btn').addEventListener('click', lessBreak)


 
 
 


