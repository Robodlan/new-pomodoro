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

// function addWork(){
//   if (!timeOut && startStop.innerHTML != 'Resume' ) {
//     currentLabel.innerHTML = "Work"
//      workMinutes += 1 
//      addWorkInput.value = workMinutes
//      workTime =  `${workMinutes}` * `${workSeconds}`
//      timeLeft.textContent = formatTime(workTime)
//   } else {
//    workMinutes = 25  
//  }
// }

// function lessWork() {
//   if (!timeOut && startStop.innerHTML != 'Resume') {
//     currentLabel.innerHTML = "Work"
//     workMinutes -= 1
//     addWorkInput.value = workMinutes
//     workTime =  `${workMinutes}` * `${workSeconds}`
//     timeLeft.textContent = formatTime(workTime)
//   } else {
//     workMinutes = 25
//   }
// }

// function addBreak(){
//   if(!timeOut && startStop.innerHTML != 'Resume') { 
//      currentLabel.innerHTML = " ⬆ Break"
//      breakMinutes += 1
//      addBreakInput.value = breakMinutes
//      breakTime = `${breakMinutes}` * `${breakSeconds}`
//      timeLeft.textContent = formatTime(breakTime)
//   } else {
//     currentLabel.innerHTML = "Work"
//     timeLeft.textContent = formatTime(workTime)
//   }
// }

// function lessBreak() {
//   if(!timeOut && startStop.innerHTML != 'Resume') {
//     currentLabel.innerHTML = " ↓ Break"
//     breakMinutes -= 1
//     addBreakInput.value = breakMinutes
//     breakTime = `${breakMinutes}` * `${breakSeconds}`
//     timeLeft.textContent = formatTime(breakTime)
//   } else {
//     currentLabel.innerHTML = 'Work'
//     timeLeft.textContent = formatTime(workTime)
//   }
// }


function toggleTimer() {
if (!timeOut || !isRunning) {
      audio.play()
      isRunning = true
      timeOut = setInterval(updateTime, 1)
      timeLeft.textContent = formatTime(workTime) 
      startStop.innerHTML = 'Pause'
      currentLabel.innerHTML = 'Work'
        addWorkInput.value = ''
        addBreakInput.value = ''
    } else {
        clearInterval(timeOut)
        timeOut = null
        startStop.innerHTML = 'Resume'
        currentLabel.innerHTML = 'Work'
        addWorkInput.value = ''
        addBreakInput.value = ''
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
    breakTime = 5 * 60
    startStop.innerHTML = 'Start'
    timeLeft.textContent = formatTime(workTime)
   }

 function updateTime() {
  timeLeft.textContent = formatTime(workTime)
  if (isRunning) {
    workTime--
    if (workTime <= 0) {
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
      clearInterval(timeOut)
      // lastAlert.play()
      document.getElementById('start-stop').disabled
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
//  document.getElementById('add-work-btn').addEventListener('click', addWork)
//  document.getElementById('less-work-btn').addEventListener('click', lessWork)
//  document.getElementById('add-break-btn').addEventListener('click', addBreak)
//  document.getElementById('less-break-btn').addEventListener('click', lessBreak)


 
 
 


