var SWButton = document.getElementsByClassName('stopwatch')[0];
var TButton = document.getElementsByClassName('timer')[0];
var timerAttr = document.getElementsByClassName('T-timer')[0];
var addBtns = document.getElementsByClassName('T-timer')[1];
var SWAttr = document.getElementsByClassName('SW-timer')[0];
var types = document.querySelectorAll('.type button')

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

SWButton.addEventListener('click', function(){
    timerAttr.style.display = ('none');
    addBtns.style.display = ('none');
    SWAttr.style.display = ('flex');
});

TButton.addEventListener('click', function(){
    timerAttr.style.display = ('flex');
    addBtns.style.display = ('flex');
    SWAttr.style.display = ('none');
});

document.querySelectorAll('input[type="Number"]').forEach(input =>{
    input.oninput = () =>{
        if (input.value.length > input.maxLength) input.value = input.value.slice(0, input.maxLength);
    };
});

