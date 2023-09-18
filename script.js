const timeLeft = document.getElementById('time-left')
const sesionValue = document.getElementById('sesion-value')
const startStop = document.getElementById('start-stop')
const timeBreak = document.getElementById('time-break')
const addBreak = document.getElementById('add-break')
const lessBreak = document.getElementById('less-break')
const addWork = document.getElementById('add-work')
const  lessWork = document.getElementById('less-work')
let currentLabel = document.getElementById('timer-label')

let timeOut
let isRunning = false
let breakPLus = 5
let plusTime = 25
let workTime =  2 * 60
let breakTime = 5 * 60
let currentTime = workTime



addWork.addEventListener('click', add)
lessWork.addEventListener('click', less)
addBreak.addEventListener('click', addBreakFun)
lessBreak.addEventListener('click', lessBreakFun)

function add() {
    plusTime+=1
    // return plusTime
    workTime = `${plusTime}` * 60
    currentTime = workTime
    timeLeft.textContent = makingTime(currentTime)
}

function less() {
    plusTime-=1
    workTime = `${plusTime}` * 60
    currentTime = workTime
    timeLeft.textContent = makingTime(currentTime)
}

function addBreakFun() {
   breakPLus += 1
   breakTime = `${breakPLus}` * 60
   currentTime = breakTime
   timeBreak.textContent = makingTime(currentTime)
}

function lessBreakFun() {
    breakPLus -= 1
    breakTime = `${breakPLus}` * 60
    currentTime = breakTime
    timeBreak.textContent = makingTime(currentTime)
}


function makingTime(seconds) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    const formatingMinutes = String(minutes).padStart(2, '0')
    const  formatingSeconds = String(remainingSeconds).padStart(2, '0')
    return `${formatingMinutes} : ${formatingSeconds}`
}

function displayUpdate() {
    timeLeft.textContent = makingTime(currentTime)
    // currentLabel.innerHTML = 'Work'
}

function toggleTimer() {
    if (isRunning) {
        clearInterval(timeOut)
        startStop.innerHTML = 'Start'
    } else {
       timeOut = setInterval(updateTime, 10)      
       startStop.innerHTML = 'Stop'
    }
    isRunning = !isRunning
 }

 function updateTime() {
    if (currentTime > 0 ) {
        // currentLabel.innerHTML = 'Work' 
        // currentLabel
        currentTime--
        displayUpdate()
        
    }  else {
        if (currentLabel.innerHTML = 'Work') {
            workTime = 0
            breakTime--
            currentTime = breakTime
            // currentTime--
            currentLabel.innerHTML = 'Break'
            // timeLeft.textContent = 25S
            timeBreak.innerHTML = makingTime(currentTime)
            // displayUpdate()
         }
        // } else {
        //     currentLabel = 'Work'
        //     currentTime = workTime
        // }
        // displayUpdate()
    }
 }

 function reset() {
    clearInterval(timeOut)
    isRunning = false
    workTime =  25 * 60
    currentTime = workTime
    document.getElementById('start-stop').innerHTML = 'Work'
    displayUpdate()
 }

 document.getElementById('start-stop').addEventListener('click', toggleTimer)
 document.getElementById('reset').addEventListener('click', reset)

