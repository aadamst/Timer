//Global variables
const start_btn = document.getElementById('start');
const reset_btn = document.getElementById('reset');
const unit_value = document.querySelectorAll('.unit-value');

let centiSeconds = 0;
let interval = null;
let isCounting = false;
let isStopwatch = true;

var SWButton = document.getElementsByClassName('stopwatch')[0];
var TButton = document.getElementsByClassName('timer')[0];
var timerAttr = document.getElementsByClassName('T-timer')[0];
var addBtns = document.getElementsByClassName('T-timer')[1];
var SWAttr = document.getElementsByClassName('SW-timer')[0];
var types = document.querySelectorAll('.type button');

types.forEach(button => {
    button.addEventListener('click', () => {
        resetButtons();
        button.classList.add('current');
    });
});

function resetButtons() {
    types.forEach(button => {
        button.classList.remove('current');
    });
};

//Event listeners
start_btn.addEventListener('click', startStop);
reset_btn.addEventListener('click', reset);

SWButton.addEventListener('click', function(){
    timerAttr.style.display = ('none');
    addBtns.style.display = ('none');
    SWAttr.style.display = ('flex');
    isStopwatch = true;
    console.log('Stopwatch');
    reset();
});

TButton.addEventListener('click', function(){
    timerAttr.style.display = ('flex');
    addBtns.style.display = ('flex');
    SWAttr.style.display = ('none');
    isStopwatch = false;
    console.log('timer');
    reset();
});

document.querySelectorAll('input[type="Number"]').forEach(input =>{
    input.oninput = () =>{
        if (input.value.length > input.maxLength) input.value = input.value.slice(0, input.maxLength);
    };
});


//Update the timer
function timer(){
    centiSeconds++;

    //Format the time
    let hrs = Math.floor(centiSeconds / 360000);
    let mins = Math.floor((centiSeconds - (hrs * 360000)) / 6000);
    let secs = Math.floor((centiSeconds - (Math.floor(centiSeconds / 6000) * 6000)) / 100);
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

function startStop(){
    if (isCounting === false){
        start();
    }
    else {
        stop();
    } 
}

function start(){
    isCounting = true;
    start_btn.classList.add('stop');
    start_btn.innerText = 'stop';
    interval = setInterval(timer, 10);
}

function stop(){
    clearInterval(interval);
    isCounting = false;
    start_btn.classList.remove('stop');
    start_btn.innerText = 'start';
    interval = null;
}

function reset(){
    stop();
    centiSeconds = 0;
    unit_value[0].innerText = '00';
    unit_value[1].innerText = '00';
    unit_value[2].innerText = '00';
    unit_value[3].innerText = '00';
}
