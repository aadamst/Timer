// Global variables
const start_btn = document.getElementById('start');
const reset_btn = document.getElementById('reset');
const unit_value = document.querySelectorAll('.unit-value');
const add_btns = document.querySelectorAll('.add-btns');
const arrows = document.querySelectorAll('.arrow');

let centiSeconds = 0;
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
    centi_Check = setInterval(centiCheck, 10);

    timer_btn.setAttribute('disabled', true);
    stopwatch_btn.removeAttribute('disabled');

    reset();
    
});

document.querySelectorAll('input[type="Number"]').forEach(input =>{
    input.oninput = () =>{
        if (input.value.length > input.maxLength) input.value = input.value.slice(0, input.maxLength);
    };
});


// Update the stopwatch
function stopwatch(){
    isCounting = true;
    start_btn.classList.add('stop');
    start_btn.innerText = 'stop';
    centiSeconds++;
    timerCalc();
}

// Update the timer
function timer(){
    if(centiSeconds <= 0){
        stop();
        // Adds flash animation to unit values when timer hits 0
        addAnim();
    }
    else {
        // timer is countdown
        isCounting = true;
        start_btn.classList.add('pause');
        start_btn.innerText = 'pause';
        centiSeconds--;
        timerCalc();
    }
}

// Calculate timer
function timerCalc(){
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
    unit_value[4].innerText = `${hrs}`;
    unit_value[5].innerText = `${mins}`;
    unit_value[6].innerText = `${secs}`;
}

// Checking centisecond value
function centiCheck(){
    if (centiSeconds >= 1){
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
        interval = setInterval(timer, 10);
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
    centiSeconds = 0;

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

// Add time to timer
// Add btns
add_btns[0].addEventListener('click', function(){
    // Adds  10mins to timer
    centiSeconds += 60010;
    timerCalc();
    removeAnim();
}); 

add_btns[1].addEventListener('click', function(){
    // Adds  5mins to timer
    centiSeconds += 30005;
    timerCalc();
    removeAnim();
}); 

add_btns[2].addEventListener('click', function(){
    // Adds  30secs to timer
    centiSeconds += 3000;
    timerCalc();
    removeAnim();
}); 

add_btns[3].addEventListener('click', function(){
    // Adds  10secs to timer
    centiSeconds += 1000;
    timerCalc();
    removeAnim();
}); 


// Arrows
arrows[0].addEventListener('click', function(){
    // Adds 1hour to the timer
    centiSeconds += 360000;
    timerCalc();
    removeAnim();
});

arrows[1].addEventListener('click', function(){
    // Take away an hour (if there is enough time);
    if(unit_value[4].innerText <= 0){
        console.log('no time to take away');
    }
    else{
        centiSeconds -= 360000;
        timerCalc();
    } 
});

arrows[2].addEventListener('click', function(){
    // Adds 1min to the timer
    centiSeconds += 6001;
    timerCalc();
    removeAnim();
});

arrows[3].addEventListener('click', function(){
    // Take away 1min (if there is enough time);
    if(unit_value[5].innerText <= 0){
        console.log('no time to take away');
    }
    else{
        centiSeconds -= 6001;
        timerCalc();
    } 
});

arrows[4].addEventListener('click', function(){
    // Adds 1sec to the timer
    centiSeconds += 100;
    timerCalc();
    removeAnim();
});

arrows[5].addEventListener('click', function(){
    // Take away 1sec (if there is enough time);
    if(unit_value[6].innerText <= 0){
        console.log('no time to take away');
    }
    else{
        centiSeconds -= 100;
        timerCalc();
    } 
});