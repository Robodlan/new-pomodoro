const timeLeft = document.getElementById('time-left')
const startStop = document.getElementById('start-stop')
const addWorkBtn = document.getElementById('add-work-btn')
const lessWorkBtn = document.getElementById('less-work-btn')
const addBreakBtn = document.getElementById('add-break-btn')
const lessBreakBtn = document.getElementById('less-break-btn')
// const addWorkInput = document.getElementById('add-work')
// const addBreakInput = document.getElementById('add-break')
const currentLabel = document.getElementById('timer-label')
const audio = new Audio('click.mp3')
const lastAlert = new Audio('chimes.mp3')



let timeOut
let isRunning = true
let workMinutes = 25
let workSeconds = 60
let breakMinutes = 5
let breakSeconds = 60
let workTime =  `${workMinutes}` * `${workSeconds}`
let breakTime = `${breakMinutes}` * `${breakSeconds}`

function addWork(){
  if (!timeOut ) {
     currentLabel.innerHTML = "+ Work"
     workMinutes += 1 
    //  addWorkInput.value = workMinutes
     workTime =  `${workMinutes}` * `${workSeconds}`
     timeLeft.textContent = formatTime(workTime)
  } else {
   workMinutes = 25  
 }
}

function lessWork() {
  if (!timeOut && startStop.innerHTML != 'Resume') {
    currentLabel.innerHTML = "- Work"
    workMinutes -= 1
    // addWorkInput.value = workMinutes
    workTime =  `${workMinutes}` * `${workSeconds}`
    timeLeft.textContent = formatTime(workTime)
  } else {
    workMinutes = 25
  }
}

function addBreak(){
  if(!timeOut && startStop.innerHTML != 'Resume') { 
     currentLabel.innerHTML = " + Break"
     breakMinutes += 1
    //  addBreakInput.value = breakMinutes
     breakTime = `${breakMinutes}` * `${breakSeconds}`
     timeLeft.textContent = formatTime(breakTime)
  } else {
    currentLabel.innerHTML = "Work"
    timeLeft.textContent = formatTime(workTime)
  }
}

function lessBreak() {
  if(!timeOut && startStop.innerHTML != 'Resume') {
    currentLabel.innerHTML = " - Break"
    breakMinutes -= 1
    // addBreakInput.value = breakMinutes
    breakTime = `${breakMinutes}` * `${breakSeconds}`
    timeLeft.textContent = formatTime(breakTime)
  } else {
    currentLabel.innerHTML = 'Work'
    timeLeft.textContent = formatTime(workTime)
  }
}


function toggleTimer() {
  addWorkBtn.setAttribute('disabled', '')
  lessWorkBtn.setAttribute('disabled', '')
  addBreakBtn.setAttribute('disabled', '')
  lessBreakBtn.setAttribute('disabled', '')
if (!timeOut || currentLabel.innerHTML === 'Done') {
      workMinutes = 25
      breakMinutes = 5
      audio.play()
      isRunning = true
      timeOut = setInterval(updateTime, 1000)
      timeLeft.textContent = formatTime(workTime) 
      startStop.innerHTML = 'Pause'
      currentLabel.innerHTML = 'Work'
      // addWorkInput.value = ''
      // addBreakInput.value = ''
    } else {
        clearInterval(timeOut)
        timeOut = null
        startStop.innerHTML = 'Resume'
        currentLabel.innerHTML = 'Pause'
    }
 }

 function reset() {
    workMinutes = 25
    breakMinutes = 5
    startStop.removeAttribute('disabled','')
    addWorkBtn.removeAttribute('disabled', '')
    lessWorkBtn.removeAttribute('disabled', '')
    addBreakBtn.removeAttribute('disabled', '')
    lessBreakBtn.removeAttribute('disabled', '')
    // addWorkInput.value = ''
    // addBreakInput.value = ''
    currentLabel.innerHTML = 'Work'
    audio.play()
    clearInterval(timeOut)
    timeOut = null
    workTime = 25 * 60
    breakTime = 5 * 60
    startStop.innerHTML = 'Start'
    timeLeft.textContent = formatTime(workTime)
    document.title = `${formatTime(isRunning ? workTime : breakTime)} ${'🍅'}`
   }

 function updateTime() {
  timeLeft.textContent = formatTime(workTime)
  if (isRunning) {
    workTime--
    if (workTime <= 0) {
      isRunning = false
      currentLabel.innerHTML = 'Break'
      startStop.innerHTML = 'We are resting'
      timeLeft.textContent = formatTime(breakTime)
    } 
  } else {
    breakTime--
    lastAlert.play()
  if (breakTime <= 0){
      isRunning = false
      currentLabel.innerHTML = 'Done!'
      startStop.innerHTML = 'Start'
      // alert('Thank You')
      clearInterval(timeOut)
      startStop.innerHTML = 'Press Reset'
      startStop.setAttribute('disabled', '')
      if (breakTime === 0) {
        document.getElementById('last-alert').play()
      }
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

startStop.addEventListener('click', toggleTimer)
document.getElementById('reset').addEventListener('click', reset)
addWorkBtn.addEventListener('click', addWork)
lessWorkBtn.addEventListener('click', lessWork)
addBreakBtn.addEventListener('click', addBreak)
lessBreakBtn.addEventListener('click', lessBreak)


 
 
 


