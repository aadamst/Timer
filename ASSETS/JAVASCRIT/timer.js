// Global variables
const start_btn = document.getElementById('start');
const reset_btn = document.getElementById('reset');
const unit_value = document.querySelectorAll('.unit-value');
const add_btns = document.querySelectorAll('.add-btns');
const arrows = document.querySelectorAll('.arrow');
const Alarm = new Audio('/ASSETS/SOUNDS/Alarm.wav');

let centiSeconds = 0;
let hours = 0;
let minuets = 0;
let seconds = 0;
let interval = null;
let isCounting = false;
let isStopwatch = true;
let centi_Check = null;

var stopwatch_btn = document.querySelector('.stopwatch');
var timer_btn = document.querySelector('.timer');
var timer_clock = document.querySelectorAll('.T-timer');
var stopwatch_clock = document.querySelector('.SW-timer');
var types = document.querySelectorAll('.type button');

// Adds 'current' class to clicked button
types.forEach(button => {
    button.addEventListener('click', () => {
        resetButtons();
        button.classList.add('current');
    });
});

// Removes 'current' class from all buttons
function resetButtons() {
    types.forEach(button => {
        button.classList.remove('current');
    });
};

// Event listeners
start_btn.addEventListener('click', startStop);
reset_btn.addEventListener('click', reset);

// Set clock to stopwatch mode
stopwatch_btn.addEventListener('click', function(){

    timer_clock.forEach(Ttimer => {
        Ttimer.style.display = ('none');
    });

    stopwatch_clock.style.display = ('flex');
    isStopwatch = true;
    clearInterval(centi_Check);
    centi_Check = null;

    stopwatch_btn.setAttribute('disabled', true);
    timer_btn.removeAttribute('disabled');
    document.title = 'Stopwatch';

    enable();

    reset();
});

// Set clock to timer mode
timer_btn.addEventListener('click', function(){

    timer_clock.forEach(Ttimer => {
        Ttimer.style.display = ('flex');
    });

    stopwatch_clock.style.display = ('none');
    isStopwatch = false
    centi_Check = setInterval(centiCheck, 1);

    timer_btn.setAttribute('disabled', true);
    stopwatch_btn.removeAttribute('disabled');
    document.title = 'Timer';

    reset();
    
});

// Update the stopwatch
function stopwatch(){
    isCounting = true;
    start_btn.classList.add('stop');
    start_btn.innerText = 'stop';
    centiSeconds++;
    StopwatchCalc();
}

// Update the timer
function timer(){
    if(seconds <= 0 && minuets <= 0 && hours <= 0){
        stop();
        playAlarm();
        // Adds flash animation to unit values when timer hits 0
        addAnim();
    }
    else {
        // timer is countdown
        isCounting = true;
        start_btn.classList.add('pause');
        start_btn.innerText = 'pause';
        timerCalc();
    }
}

// Calculate stopwatch
function StopwatchCalc(){
    // Format the time
    let hrsCalc = (centiSeconds / 360000);
    let hrs = Math.floor(hrsCalc);
    let minsCalc = (hrsCalc - hrs) * 60;
    let mins = Math.floor(minsCalc);
    let secsCalc = (minsCalc - mins) * 60;
    let secs = Math.floor(secsCalc);
    let centi = centiSeconds % 100;

    if (centi < 10) centi = '0' + centi;
    if (secs < 10) secs = '0' + secs;
    if (mins < 10) mins = '0' + mins;
    if (hrs < 10) hrs = '0' + hrs;
    
    unit_value[0].innerText = `${hrs}`;
    unit_value[1].innerText = `${mins}`;
    unit_value[2].innerText = `${secs}`;
    unit_value[3].innerText = `${centi}`;

}

// Calculate timer
function timerCalc(){
    
    if(seconds != 0){
        seconds--;
    }
    else if (minuets != 0 && seconds == 0) {
        seconds = 59;
        minuets--;
    }
    else if (hours != 0 && minuets == 0 && seconds == 0) {
        hours--;
        minuets = 59;
        seconds = 59;
    }

    formatTimer();
}

// Format timer
function formatTimer() {
    if (seconds < 10) unit_value[6].innerText = '0' + seconds;
    if (seconds >= 10) unit_value[6].innerText = seconds;
    if (seconds >= 60) {unit_value[6].innerText = '00'; seconds = 0; minuets++;}
    if (minuets < 10) unit_value[5].innerText = '0' + minuets;
    if (minuets >= 10) unit_value[5].innerText = minuets;
    if (minuets >= 60) {unit_value[5].innerText = '00'; minuets = 0; hours++;}
    if (hours < 10) unit_value[4].innerText = '0' + hours;
    if (hours >= 10) unit_value[4].innerText = hours;
}

// Checking centisecond value
function centiCheck(){
    if (seconds >= 1 || minuets >= 1 || hours >= 1){
        enable();
    } 
    else {
        disable();
    }
}

// Start/Stop stopwatch/timer
function startStop(){
    if (isCounting === false){
        start();
    }
    else {
        stop();
    } 
}

// start counting
function start(){
    if (isStopwatch === true){
        interval = setInterval(stopwatch, 10);
    }
    else {
        interval = setInterval(timer, 1000);
        start_btn.classList.add('pause');
        start_btn.innerText = 'pause';
    }
}

// stop counting
function stop(){
    clearInterval(interval);
    isCounting = false;
    start_btn.classList.remove('stop', 'pause');
    start_btn.innerText = 'start';
    interval = null;
}

// Reset everything
function reset(){
    console.clear();
    stop();
    stopAlarm();
    centiSeconds = 0;
    seconds = 0;
    minuets = 0;
    hours = 0;

    // Reset all unit values to '00'
    unit_value.forEach(unitValue => {
        unitValue.innerText = '00';
    })

    // Remove flash animation
    removeAnim();
}

// Enables buttons
function enable(){
    start_btn.classList.remove('disable');
    start_btn.removeAttribute('disabled'); 
}

// Disables buttons
function disable(){
    start_btn.classList.remove('stop', 'pause');
    start_btn.innerText = 'start';
    start_btn.classList.add('disable');
    start_btn.setAttribute('disabled', true);
}

// Adds flash animation to unit values
function addAnim(){
    unit_value.forEach(unitValue => {
        unitValue.classList.add('flash')
    })
}

// Remove flash animation from unit values
function removeAnim(){
    unit_value.forEach(unitValue => {
        unitValue.classList.remove('flash')
    })
}

// Plays Alarm Sound
function playAlarm(){
    Alarm.play();
    Alarm.loop = true;
}

// Stops Alarm Sound
function stopAlarm(){
    Alarm.pause();
    Alarm.currentTime = 0;
}

// Add time to timer
// Add btns
add_btns[0].addEventListener('click', function(){
    // Adds  10mins to timer
    minuets += 10;
    formatTimer();
    removeAnim();
}); 

add_btns[1].addEventListener('click', function(){
    // Adds  5mins to timer
    minuets += 5;
    formatTimer();
    removeAnim();
}); 

add_btns[2].addEventListener('click', function(){
    // Adds  30secs to timer
    seconds += 30;
    formatTimer();
    removeAnim();
}); 

add_btns[3].addEventListener('click', function(){
    // Adds  10secs to timer
    seconds += 10;
    formatTimer();
    removeAnim();
}); 


// Arrows
arrows[0].addEventListener('click', function(){
    // Adds 1hour to the timer
    hours += 1;
    formatTimer();
    removeAnim();
});

arrows[1].addEventListener('click', function(){
    // Take away an hour (if there is enough time);
    if(unit_value[4].innerText <= 0){
        console.log('no time to take away');
    }
    else{
        hours -= 1;
        formatTimer();
    } 
});

arrows[2].addEventListener('click', function(){
    // Adds 1min to the timer
    minuets += 1;
    formatTimer();
    removeAnim();
});

arrows[3].addEventListener('click', function(){
    // Take away 1min (if there is enough time);
    if(unit_value[5].innerText <= 0){
        console.log('no time to take away');
    }
    else{
        minuets -= 1;
        formatTimer();
    } 
});

arrows[4].addEventListener('click', function(){
    // Adds 1sec to the timer
    seconds += 1;
    formatTimer();
    removeAnim();
});

arrows[5].addEventListener('click', function(){
    // Take away 1sec (if there is enough time);
    if(unit_value[6].innerText <= 0){
        console.log('no time to take away');
    }
    else{
        seconds -= 1;
        formatTimer();
    } 
});