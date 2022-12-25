// Global variables
const start_btn = document.getElementById('start');
const reset_btn = document.getElementById('reset');
const unit_value = document.querySelectorAll('.unit-value');
const add_btns = document.querySelectorAll('.add-btns');
const arrows = document.querySelectorAll('.arrow');
const date = document.getElementById('date')
const Alarm = new Audio('/ASSETS/SOUNDS/Alarm.wav');

let centiSeconds = 0;
let hours = 0;
let minuets = 0;
let seconds = 0;
let interval = null;
let isCounting = false;
let isStopwatch = true;
let isCountdown = false;
let centi_Check = null;
let date_Check = null;
date.value = "";

var stopwatch_btn = document.querySelector('.stopwatch');
var timer_btn = document.querySelector('.timer');
var countdown_btn = document.querySelector('.countdown');
var stopwatch_clock = document.querySelector('.SW-timer');
var timer_clock = document.querySelectorAll('.T-timer');
var countdown_clock = document.querySelectorAll('.CD-timer');
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
    countdown_clock.forEach(Ccountdown => {
        Ccountdown.style.display = ('none');
    });
    stopwatch_clock.style.display = ('flex');

    isStopwatch = true;
    isCountdown = false;

    clearInterval(centi_Check);
    centi_Check = null;
    clearInterval(date_Check);
    date_Check = null;

    stopwatch_btn.setAttribute('disabled', true);
    timer_btn.removeAttribute('disabled');
    countdown_btn.removeAttribute('disabled');
    document.title = 'Stopwatch';

    enable();

    reset();
});

// Set clock to timer mode
timer_btn.addEventListener('click', function(){

    timer_clock.forEach(Ttimer => {
        Ttimer.style.display = ('flex');
    });
    countdown_clock.forEach(Ccountdown => {
        Ccountdown.style.display = ('none');
    });
    stopwatch_clock.style.display = ('none');

    isStopwatch = false;
    isCountdown = false;

    clearInterval(date_Check);
    date_Check = null;
    centi_Check = setInterval(centiCheck, 1);

    timer_btn.setAttribute('disabled', true);
    stopwatch_btn.removeAttribute('disabled');
    countdown_btn.removeAttribute('disabled');
    document.title = 'Timer';

    reset();
    
});

// Set clock to countdown mode
countdown_btn.addEventListener('click', function(){

    timer_clock.forEach(Ttimer => {
        Ttimer.style.display = ('none');
    });
    countdown_clock.forEach(Ccountdown => {
        Ccountdown.style.display = ('flex');
    });
    stopwatch_clock.style.display = ('none');

    isStopwatch = false;
    isCountdown = true;

    clearInterval(centi_Check);
    centi_Check = null;
    date_Check = setInterval(dateCheck, 1);

    countdown_btn.setAttribute('disabled', true);
    stopwatch_btn.removeAttribute('disabled');
    timer_btn.removeAttribute('disabled');
    document.title = 'Countdown';

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

// Update the countdown
function countdown(){
    if (date.value != "" && timeDifference() > 0){
        isCounting = true;
        countdownCalc();
    } 
    else {
        stop();
        playAlarm();
        // Adds flash animation to unit values when timer hits 0
        addAnim();
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

// Getting difference between current date and selected date
function timeDifference(){
    const tc = new Date();
    const tf = new Date(date.value);
    const deltaT = tf - tc;

    return deltaT;
}

// Calculate countdown
function countdownCalc(){
    let daysCalc = timeDifference() / (1000 * 60 * 60 * 24);
    let days = Math.floor(daysCalc);
    let hrsCalc = (daysCalc - days) * 24;
    let hrs = Math.floor(hrsCalc);
    let minsCalc = (hrsCalc - hrs) * 60;
    let mins = Math.floor(minsCalc);
    let secsCalc = (minsCalc - mins) * 60;
    let secs = Math.floor(secsCalc);

    if (secs < 10) secs = '0' + secs;
    if (mins < 10) mins = '0' + mins;
    if (hrs < 10) hrs = '0' + hrs;
    if (days < 10) days = '0' + days;

    unit_value[7].innerText = `${days}`;
    unit_value[8].innerText = `${hrs}`;
    unit_value[9].innerText = `${mins}`;
    unit_value[10].innerText = `${secs}`;
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

// Checking time value
function centiCheck(){
    if (seconds >= 1 || minuets >= 1 || hours >= 1){
        enable();
    } 
    else {
        disable();
    }
}

// Checking date value
function dateCheck(){

    if (date.value != "" && timeDifference() > 0){
        enable();
    } 
    else {
        disable();
    }
}

// Start/Stop clock
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
    else if (isCountdown === true) {
        interval = setInterval(countdown, 1000);
        start_btn.classList.add('pause');
        start_btn.innerText = 'pause';
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

    date.value = "";

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