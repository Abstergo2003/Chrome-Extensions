function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    let d = today.getDay()
    let dn = today.getDate()
    let mn = today.getMonth()
    let yn = today.getFullYear()
    let dd;
    let mm;
    switch (d) {
        case 0:  dd = "Sunday" ; break;
        case 1:  dd = "Monday";  break;
        case 2:  dd = "Tuesday" ; break;
        case 3:  dd = "Wednesday" ; break;
        case 4:  dd = "Thursday" ; break;
        case 5:  dd = "Friday" ; break;
        case 6:  dd = "Saturday" ; break;
    }
    switch (mn) {
        case 0:  mm = "1";  break;
        case 1:  mm = "2" ; break;
        case 2:  mm = "3" ; break;
        case 3:  mm = "4" ; break;
        case 4:  mm = "5" ; break;
        case 5:  mm = "6" ; break;
        case 6:  mm = "7" ; break;
        case 7:  mm = "8" ; break;
        case 8:  mm = "9" ; break;
        case 9:  mm = "10" ; break;
        case 10:  mm = "11" ; break;
        case 11:  mm = "12" ; break;
    }
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML =  h + ":" + m + ":" + s;
    document.getElementById("date").innerHTML = dn + "." + mm + "." + yn + "<br>" + dd;
    setTimeout(startTime, 1000);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
function clock_mode_swap(id) {
    if (id == "button_clock_clock") {
        document.getElementById("clock_clock").style.left = "0px"
        document.getElementById("clock_stoper").style.left = "400px"
        document.getElementById("clock_countdown").style.left = "800px"
    } else if (id == "button_clock_stoper") {
        document.getElementById("clock_clock").style.left = "-400px"
        document.getElementById("clock_stoper").style.left = "0px"
        document.getElementById("clock_countdown").style.left = "400px"
    } else if (id == "button_clock_countdown") {
        document.getElementById("clock_clock").style.left = "-800px"
        document.getElementById("clock_stoper").style.left = "-400px"
        document.getElementById("clock_countdown").style.left = "0px"
    }
}

function clock_countdown_window_trigger() {
    document.getElementById("clock_countdown").style.top = "-150px"
    document.getElementById("clock_countdown_set").style.top = "0px"
}
var seconds = 00; 
var tens = 00; 
var appendTens = document.getElementById("clock_stoper_miliseconds")
var appendSeconds = document.getElementById("clock_stoper_seconds")
var buttonStart = document.getElementById('clock_stoper_start');
var buttonStop = document.getElementById('clock_stoper_stop');
var buttonReset = document.getElementById('clock_stoper_reset');
var Interval ;

buttonStart.onclick = function() {
    
clearInterval(Interval);
    Interval = setInterval(startTimer, 10);
}
  
buttonStop.onclick = function() {
    clearInterval(Interval);
}
  

buttonReset.onclick = function() {
    clearInterval(Interval);
    tens = "00";
  	seconds = "00";
    appendTens.innerHTML = tens;
  	appendSeconds.innerHTML = seconds;
}

function startTimer () {
    tens++; 
    if(tens <= 9){
        appendTens.innerHTML = "0" + tens;
    }
    
    if (tens > 9){
        appendTens.innerHTML = tens;
      
    } 
    
    if (tens > 99) {
        console.log("seconds");
        seconds++;
        appendSeconds.innerHTML = "0" + seconds;
        tens = 0;
        appendTens.innerHTML = "0" + 0;
    }
    
    if (seconds > 9){
        appendSeconds.innerHTML = seconds;
    }
}
var clock_countdown_min = 0;
var clock_countdown_sec = 0;
var clock_countdown_state = 0;
function clock_countdown_set(id) {
    if (id == "clock_countdown_set_minutes_add") {
        clock_countdown_min++
        document.getElementById("clock_countdown_minutes_input").innerHTML = clock_countdown_min
    } else if (id == "clock_countdown_set_minutes_remove") {
        clock_countdown_min--
        document.getElementById("clock_countdown_minutes_input").innerHTML = clock_countdown_min
    } else if (id == "clock_countdown_set_seconds_add") {
        clock_countdown_sec++
        document.getElementById("clock_countdown_seconds_input").innerHTML = clock_countdown_sec
    } else {
        clock_countdown_sec--
        document.getElementById("clock_countdown_seconds_input").innerHTML = clock_countdown_sec
    }
}
function clock_countdown_start() {
    if (clock_countdown_state == 0) {
    clock_countdown_sec = clock_countdown_sec + clock_countdown_min * 60;
    clock_countdown_state = 1
    } else {}
    clock_countdown_sec--
    document.getElementById("clock_countdown_minutes_input").innerHTML = Math.floor(clock_countdown_sec / 60)
    document.getElementById("clock_countdown_seconds_input").innerHTML =  clock_countdown_sec - 60 * Math.floor(clock_countdown_sec / 60)
    if (clock_countdown_sec == 0) {
        var audio = new Audio('countdown_stop.wav');
        audio.play()
        console.log("ended")
        clock_countdown_state = 0;
    } else {
        setTimeout(clock_countdown_start, 1000)
    }
}
function clock_countdown_stop() {
    clock_countdown_sec = 1;
    clock_countdown_min = 0;
    clock_countdown_state = 0;
}