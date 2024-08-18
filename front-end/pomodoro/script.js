var mode = "reset";
var timer = null;
var minutes = 0;
var seconds = 0;

if (Notification.permission !== "granted") {
    Notification.requestPermission();
}

function increaseWorkTime() {
    mathAddElement("work-time", 1);
}

function decreaseWorkTime() {
    mathAddElement("work-time", -1);
}

function increaseBreakTime() {
    mathAddElement("break-time", 1);
}

function decreaseBreakTime() {
    mathAddElement("break-time", -1);
}

function startWork() {
    if (mode == "work") return;
    if (mode != "paused" ||  (minutes == 0 && seconds == 0)) {
        minutes = mathGetElementIntValue("work-time");
        seconds = 0;
    }

    mode = "work";
    startTimer();
}

function startBreak() {
    if (mode == "break") return;
    if (mode != "paused" ||  (minutes == 0 && seconds == 0)) {
        minutes = mathGetElementIntValue("break-time");
        seconds = 0;
    }

    mode = "break";
    startTimer();
}

function startTimer() {
    timer = setInterval(function () {
        if (seconds == 0) {
            if (minutes == 0) {
                clearInterval(timer);
                notify();
            } else {
                minutes--;
                seconds = 59;
            }
        } else {
            seconds--;
        }
        setElementValueWithPadding("minutes", minutes);
        setElementValueWithPadding("seconds", seconds);
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    mode = "paused";
}

function reset() {
    clearInterval(timer);
    mode = "reset";
    minutes = mathGetElementIntValue("work-time");
    seconds = 0;
    setElementValueWithPadding("minutes", minutes);
    setElementValueWithPadding("seconds", seconds);
}

function mathGetElementIntValue(id) {
    return parseInt(document.getElementById(id).innerHTML);
}

function mathAddElement(id, value) {
    let element = document.getElementById(id);
    element.innerHTML = parseInt(element.innerHTML) + value;
}

function setElementValueWithPadding(id, value) {
    setElementValue(id, value.toString().padStart(2, "0"));
}

function setElementValue(id, value) {
    document.getElementById(id).innerHTML = value;
}

function notify() {
    var notification = new Notification('Pomodoro', {
        body: mode == "work" ? "Time to take a break!" : "Time to work!",
    });

    notification.onclick = function () {
        window.focus();
    };
}