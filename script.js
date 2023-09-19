let timeLeft = document.getElementById('time-left')
const showWork = document.getElementById('work')
// const sesionValue = document.getElementById('sesion-value')
const startStop = document.getElementById('start-stop')
// const timeBreak = document.getElementById('time-break')
// const addBreak = document.getElementById('add-break')
// const lessBreak = document.getElementById('less-break')
const addWork = document.getElementById('add-work')
// const  lessWork = document.getElementById('less-work')
const shortBreak = document.getElementById('short-break')
const longBreak = document.getElementById('long-break')
let currentLabel = document.getElementById('timer-label')
let audio = new Audio('click.mp3')

let timeOut
let isRunning = false
let breakLong = 15
let breakPLus = 5
let plusTime = 25
let workTime =  25 * 60
let breakTime = 5 * 60
let currentTime = workTime



// addWork.addEventListener('click', add)
// lessWork.addEventListener('click', less)
// addBreak.addEventListener('click', addBreakFun)
// lessBreak.addEventListener('click', lessBreakFun)
shortBreak.addEventListener('click', displayShortBreak)
longBreak.addEventListener('click', displayLongBreak)
showWork.addEventListener('click', displayWork)

function displayWork() {
    audio.play()
    currentLabel.innerHTML = 'Work'
    workTime = 25 * 60
    currentTime =  workTime
    displayUpdate()
}

function displayShortBreak() {
    audio.play()
    currentLabel.innerHTML = 'Break'
    currentTime = breakTime
    displayUpdate()
}

function displayLongBreak() {
    audio.play()
    currentLabel.innerHTML = 'Long Break'
    workTime = 15 * 60
    currentTime = workTime
    displayUpdate()
}


// function add() {
//     if (displayWork) {
//         currentTime++
//     } else if (displayShortBreak) {
//         breakPLus++
//         currentTime = `${breakPLus}` * 60
//         currentTime++
//         // timeLeft.textContent = makingTime(currentTime)
//         // displayUpdate()
//     } else {
//         breakLong++
//         currentTime = `${breakLong}` * 60
//         let x = currentTime++
//         timeLeft.textContent = makingTime(x)
//         displayUpdate()
//     }
  
// }

function less() {
    plusTime-=1
    workTime = `${plusTime}` * 60
    currentTime = workTime
    timeLeft.textContent = makingTime(currentTime)
}

// function addBreakFun() {
//    breakPLus += 1
//    breakTime = `${breakPLus}` * 60
//    currentTime = breakTime
//    timeBreak.textContent = makingTime(currentTime)
// }

// function lessBreakFun() {
//     breakPLus -= 1
//     breakTime = `${breakPLus}` * 60
//     currentTime = breakTime
//     timeBreak.textContent = makingTime(currentTime)
// }


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
    audio.play()
    if (isRunning) {
        clearInterval(timeOut)
        startStop.innerHTML = 'Start'
    } else {
       timeOut = setInterval(updateTime, 1000)      
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
        if (currentLabel.innerHTML = 'Work' && currentTime === 0) {
            workTime = 5 * 60
            currentTime = workTime
            currentTime--
            // breakTime--
            // currentTime = breakTime
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
    audio.play()
    clearInterval(timeOut)
    isRunning = false
    workTime =  25 * 60
    currentTime = workTime
    document.getElementById('start-stop').innerHTML = 'Start'
    displayUpdate()
 }

 document.getElementById('start-stop').addEventListener('click', toggleTimer)
 document.getElementById('reset').addEventListener('click', reset)

